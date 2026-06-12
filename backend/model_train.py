import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score, precision_score, recall_score
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer

from model_comparison import evaluate_models
from utils import clean_text

BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / 'dataset.csv'
MODEL_PATH = BASE_DIR / 'model.pkl'
VECTORIZER_PATH = BASE_DIR / 'vectorizer.pkl'
METRICS_PATH = BASE_DIR / 'metrics.json'
STATISTICS_PATH = BASE_DIR / 'statistics.json'
MODEL_COMPARISON_PATH = BASE_DIR / 'models_comparison.json'


def load_dataset() -> pd.DataFrame:
    df = pd.read_csv(DATASET_PATH)
    if 'review' not in df.columns or 'sentiment' not in df.columns:
        raise ValueError('Le dataset doit contenir les colonnes review et sentiment.')
    df = df.dropna(subset=['review', 'sentiment']).copy()
    df['review_clean'] = df['review'].astype(str).map(clean_text)
    return df


def train() -> None:
    df = load_dataset()
    X = df['review_clean'].tolist()
    y = df['sentiment'].map({'positive': 'Positif', 'negative': 'Négatif'}).tolist()

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    vectorizer = TfidfVectorizer(max_features=10000, ngram_range=(1, 2), stop_words='english')
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)

    model = LogisticRegression(max_iter=1000, solver='liblinear')
    model.fit(X_train_tfidf, y_train)

    y_pred = model.predict(X_test_tfidf)
    y_score = model.predict_proba(X_test_tfidf)
    confidence_scores = [float(max(prob)) for prob in y_score]

    metrics = {
        'accuracy': round(accuracy_score(y_test, y_pred) * 100, 2),
        'precision': round(precision_score(y_test, y_pred, pos_label='Positif') * 100, 2),
        'recall': round(recall_score(y_test, y_pred, pos_label='Positif') * 100, 2),
        'f1_score': round(f1_score(y_test, y_pred, pos_label='Positif') * 100, 2),
        'confusion_matrix': confusion_matrix(y_test, y_pred).tolist(),
    }

    statistics = {
        'totalReviews': int(df.shape[0]),
        'positiveReviews': int((df['sentiment'] == 'positive').sum()),
        'negativeReviews': int((df['sentiment'] == 'negative').sum()),
        'trainSamples': int(len(X_train)),
        'testSamples': int(len(X_test)),
    }

    joblib.dump(model, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)

    with open(METRICS_PATH, 'w', encoding='utf-8') as metrics_file:
        json.dump(metrics, metrics_file, ensure_ascii=False, indent=2)

    with open(STATISTICS_PATH, 'w', encoding='utf-8') as statistics_file:
        json.dump(statistics, statistics_file, ensure_ascii=False, indent=2)

    print('Entraînement terminé.')
    print(f'Modèle enregistré dans: {MODEL_PATH}')
    print(f'Vectorizer enregistré dans: {VECTORIZER_PATH}')
    print(f'Métriques enregistrées dans: {METRICS_PATH}')
    print(f'Statistiques enregistrées dans: {STATISTICS_PATH}')
    print('Résumé des métriques:')
    print(json.dumps(metrics, ensure_ascii=False, indent=2))


    comparison = evaluate_models(X, y)
    with open(MODEL_COMPARISON_PATH, 'w', encoding='utf-8') as f:
        json.dump(comparison, f, ensure_ascii=False, indent=2)
    print('\nComparaison des modèles enregistrée dans: ' + str(MODEL_COMPARISON_PATH))
    print(json.dumps(comparison, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    train()
