import json
<<<<<<< HEAD
import logging
import time
=======
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
from pathlib import Path

import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import delete_history_item, fetch_history, init_db, insert_prediction
<<<<<<< HEAD
from eda import (
    get_frequent_words,
    get_review_length_stats,
    get_sentiment_distribution,
    get_wordcloud_negative,
    get_wordcloud_positive,
    preload_all,
)
from utils import clean_text

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
logger = logging.getLogger(__name__)

=======
from model_comparison import evaluate_models
from utils import clean_text

>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
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

<<<<<<< HEAD
logger.info('Loading model and vectorizer...')
try:
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    logger.info('Model and vectorizer loaded successfully')
except FileNotFoundError as error:
    raise RuntimeError(
        'Le modèle ou le vectorizer n\'a pas été trouvé.'
    ) from error

logger.info('Loading metrics...')
with open(METRICS_PATH, 'r', encoding='utf-8') as f:
    metrics = json.load(f)

logger.info('Loading statistics...')
with open(STATISTICS_PATH, 'r', encoding='utf-8') as f:
    statistics = json.load(f)

logger.info('Preloading EDA data...')
preload_all()
logger.info('EDA data preloaded successfully')
=======
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
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2


class ReviewRequest(BaseModel):
    review: str


@app.get('/api/statistics')
async def get_statistics():
<<<<<<< HEAD
    dist = get_sentiment_distribution()
    if not dist:
        raise HTTPException(status_code=503, detail='Les données ne sont pas encore disponibles.')
    total = dist['total']
    positif = dist['positive']
    taux_satisfaction = round((positif / total) * 100, 1) if total > 0 else 0.0
    return {
        'totalReviews': total,
        'positiveReviews': positif,
        'negativeReviews': dist['negative'],
        'satisfactionRate': taux_satisfaction,
        'trainSamples': statistics.get('trainSamples', 0),
        'testSamples': statistics.get('testSamples', 0),
    }
=======
    return statistics
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2


@app.get('/api/metrics')
async def get_metrics():
    return metrics


@app.get('/api/models-comparison')
async def get_models_comparison():
    try:
        with open(MODEL_COMPARISON_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
<<<<<<< HEAD
        raise HTTPException(status_code=503, detail='La comparaison des modèles n\'est pas disponible.')
=======
        raise HTTPException(status_code=503, detail="La comparaison des modèles n'est pas disponible. Exécutez d'abord l'entraînement.")
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2


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
<<<<<<< HEAD
        raise HTTPException(status_code=400, detail='Le texte de l\'avis est requis.')

    start = time.time()
=======
        raise HTTPException(status_code=400, detail='Le texte de l’avis est requis.')

>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
    review_clean = clean_text(request.review)
    review_vector = vectorizer.transform([review_clean])
    probabilities = model.predict_proba(review_vector)[0]
    prediction = model.predict(review_vector)[0]
    confidence = float(max(probabilities)) * 100
<<<<<<< HEAD
    elapsed = time.time() - start
    logger.info(f'Prediction completed in {elapsed:.3f}s - sentiment={prediction} confidence={confidence:.1f}%')

    record = insert_prediction(request.review, prediction, round(confidence, 1))
    return {
        'review': request.review,
        'sentiment': prediction,
        'confidence': round(confidence, 1),
        'created_at': record['created_at'],
    }


@app.get('/api/eda/distribution')
async def api_sentiment_distribution():
    result = get_sentiment_distribution()
    if not result:
        raise HTTPException(status_code=503, detail='Les données ne sont pas encore disponibles.')
    return result


@app.get('/api/eda/review-length')
async def api_review_length():
    result = get_review_length_stats()
    if not result:
        raise HTTPException(status_code=503, detail='Les données ne sont pas encore disponibles.')
    return result


@app.get('/api/eda/frequent-words')
async def api_frequent_words():
    result = get_frequent_words()
    if not result:
        raise HTTPException(status_code=503, detail='Les données ne sont pas encore disponibles.')
    return result


@app.get('/api/eda/wordcloud-positive')
async def api_wordcloud_positive():
    img = get_wordcloud_positive()
    if not img:
        raise HTTPException(status_code=503, detail='Les données ne sont pas encore disponibles.')
    return {'image': img}


@app.get('/api/eda/wordcloud-negative')
async def api_wordcloud_negative():
    img = get_wordcloud_negative()
    if not img:
        raise HTTPException(status_code=503, detail='Les données ne sont pas encore disponibles.')
    return {'image': img}
=======
    sentiment = prediction

    record = insert_prediction(request.review, sentiment, confidence)
    return {
        'review': request.review,
        'sentiment': sentiment,
        'confidence': round(confidence, 1),
        'created_at': record['created_at'],
    }
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
