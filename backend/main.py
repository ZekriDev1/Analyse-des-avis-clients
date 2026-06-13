import json
from pathlib import Path

import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import delete_history_item, fetch_history, init_db, insert_prediction
from model_comparison import evaluate_models
from utils import clean_text

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / 'model.pkl'
VECTORIZER_PATH = BASE_DIR / 'vectorizer.pkl'
METRICS_PATH = BASE_DIR / 'metrics.json'
STATISTICS_PATH = BASE_DIR / 'statistics.json'
MODEL_COMPARISON_PATH = BASE_DIR / 'models_comparison.json'

app = FastAPI(title='API Analyse de Sentiments')
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

init_db()

try:
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
except FileNotFoundError as error:
    raise RuntimeError(
        'Le modèle ou le vectorizer n’a pas été trouvé. Exécutez backend/model_train.py avant de démarrer le serveur.'
    ) from error

with open(METRICS_PATH, 'r', encoding='utf-8') as metrics_file:
    metrics = json.load(metrics_file)

with open(STATISTICS_PATH, 'r', encoding='utf-8') as statistics_file:
    statistics = json.load(statistics_file)


class ReviewRequest(BaseModel):
    review: str


@app.get('/api/statistics')
async def get_statistics():
    return statistics


@app.get('/api/metrics')
async def get_metrics():
    return metrics


@app.get('/api/models-comparison')
async def get_models_comparison():
    try:
        with open(MODEL_COMPARISON_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=503, detail="La comparaison des modèles n'est pas disponible. Exécutez d'abord l'entraînement.")


@app.get('/api/history')
async def get_history():
    return fetch_history()


@app.delete('/api/history/{item_id}')
async def delete_history(item_id: int):
    deleted = delete_history_item(item_id)
    if not deleted:
        raise HTTPException(status_code=404, detail='Analyse non trouvée')
    return {'success': True}


@app.post('/api/predict')
async def predict(request: ReviewRequest):
    if not request.review.strip():
        raise HTTPException(status_code=400, detail='Le texte de l’avis est requis.')

    review_clean = clean_text(request.review)
    review_vector = vectorizer.transform([review_clean])
    probabilities = model.predict_proba(review_vector)[0]
    prediction = model.predict(review_vector)[0]
    confidence = float(max(probabilities)) * 100
    sentiment = prediction

    record = insert_prediction(request.review, sentiment, confidence)
    return {
        'review': request.review,
        'sentiment': sentiment,
        'confidence': round(confidence, 1),
        'created_at': record['created_at'],
    }
