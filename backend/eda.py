import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

CACHE = {}

def _load(key, filename):
    if key not in CACHE:
        path = BASE_DIR / filename
        if path.exists():
            with open(path, 'r', encoding='utf-8') as f:
                CACHE[key] = json.load(f)
        else:
            CACHE[key] = None
    return CACHE[key]

def preload_all():
    for key, filename in [
        ('distribution', 'eda_distribution.json'),
        ('review_length', 'eda_review_length.json'),
        ('frequent_words', 'eda_frequent_words.json'),
        ('wordcloud_positive', 'eda_wordcloud_positive.json'),
        ('wordcloud_negative', 'eda_wordcloud_negative.json'),
    ]:
        _load(key, filename)

def get_sentiment_distribution():
    return _load('distribution', 'eda_distribution.json')

def get_review_length_stats():
    return _load('review_length', 'eda_review_length.json')

def get_frequent_words():
    return _load('frequent_words', 'eda_frequent_words.json')

def get_wordcloud_positive():
    data = _load('wordcloud_positive', 'eda_wordcloud_positive.json')
    return data['image'] if data else ''

def get_wordcloud_negative():
    data = _load('wordcloud_negative', 'eda_wordcloud_negative.json')
    return data['image'] if data else ''