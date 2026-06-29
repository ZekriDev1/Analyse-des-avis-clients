import base64
import io
import json
from collections import Counter
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from wordcloud import WordCloud

from utils import clean_text

BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / 'dataset.csv'

plt.rcParams['figure.dpi'] = 100
plt.rcParams['savefig.dpi'] = 150

df = pd.read_csv(DATASET_PATH)
df = df.dropna(subset=['review', 'sentiment']).copy()
df['review_clean'] = df['review'].astype(str).map(clean_text)
df['word_count'] = df['review_clean'].str.split().str.len()

STOP_WORDS = set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'by', 'with', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'could', 'should', 'may', 'might', 'shall', 'can', 'not',
    'no', 'nor', 'none', 'its', 'it', 'this', 'that', 'these', 'those',
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you',
    'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his',
    'himself', 'she', 'her', 'hers', 'herself', 'they', 'them', 'their',
    'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'whose',
    'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both',
    'few', 'more', 'most', 'other', 'some', 'such', 'only', 'own',
    'same', 'so', 'than', 'too', 'very', 'just', 'because', 'if',
    'while', 'about', 'between', 'through', 'during', 'before', 'after',
    'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under',
    'again', 'further', 'then', 'once', 'here', 'there', 'also', 'into',
    'dont', 'doesnt', 'didnt', 'wont', 'wouldnt', 'couldnt', 'shouldnt',
    'isnt', 'arent', 'wasnt', 'werent', 'havent', 'hasnt', 'hadnt',
    'br', 'one', 'two', 'get', 'got', 'make', 'made', 'like', 'even',
    'much', 'still', 'well', 'back', 'also', 'actually', 'really',
])

def precompute_sentiment_distribution():
    positif = int((df['sentiment'] == 'positive').sum())
    negatif = int((df['sentiment'] == 'negative').sum())
    data = {
        'positive': positif,
        'negative': negatif,
        'total': int(df.shape[0]),
    }
    with open(BASE_DIR / 'eda_distribution.json', 'w') as f:
        json.dump(data, f)
    print('eda_distribution.json saved')

def precompute_review_length():
    data = {
        'mean_word_count': round(float(df['word_count'].mean()), 1),
        'median_word_count': int(df['word_count'].median()),
        'min_word_count': int(df['word_count'].min()),
        'max_word_count': int(df['word_count'].max()),
        'mean_char_count': round(float(df['word_count'].sum() / len(df)), 1),
        'distribution': [
            {'range': '0-50', 'count': int(((df['word_count'] >= 0) & (df['word_count'] <= 50)).sum())},
            {'range': '51-100', 'count': int(((df['word_count'] > 50) & (df['word_count'] <= 100)).sum())},
            {'range': '101-150', 'count': int(((df['word_count'] > 100) & (df['word_count'] <= 150)).sum())},
            {'range': '151-200', 'count': int(((df['word_count'] > 150) & (df['word_count'] <= 200)).sum())},
            {'range': '201-300', 'count': int(((df['word_count'] > 200) & (df['word_count'] <= 300)).sum())},
            {'range': '301-500', 'count': int(((df['word_count'] > 300) & (df['word_count'] <= 500)).sum())},
            {'range': '500+', 'count': int((df['word_count'] > 500).sum())},
        ],
    }
    with open(BASE_DIR / 'eda_review_length.json', 'w') as f:
        json.dump(data, f)
    print('eda_review_length.json saved')

def precompute_frequent_words():
    all_words = []
    for text in df['review_clean']:
        words = text.split()
        filtered = [w for w in words if w not in STOP_WORDS and len(w) > 2]
        all_words.extend(filtered)
    word_counts = Counter(all_words).most_common(20)
    data = {
        'words': [
            {'word': word, 'count': count}
            for word, count in word_counts
        ],
    }
    with open(BASE_DIR / 'eda_frequent_words.json', 'w') as f:
        json.dump(data, f)
    print('eda_frequent_words.json saved')

def precompute_wordcloud(sentiment, filename):
    df_filtered = df[df['sentiment'] == sentiment]
    text = ' '.join(df_filtered['review'].astype(str).head(10000).tolist())
    text_clean = clean_text(text)

    fig, ax = plt.subplots(figsize=(10, 6))
    color = 'Greens' if sentiment == 'positive' else 'Reds'

    wc = WordCloud(
        width=800, height=500, background_color='white', max_words=150,
        stopwords=STOP_WORDS, colormap=color, random_state=42,
        collocations=False,
    ).generate(text_clean)

    ax.imshow(wc, interpolation='bilinear')
    ax.axis('off')
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight', dpi=150)
    plt.close(fig)
    buf.seek(0)

    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    with open(BASE_DIR / filename, 'w') as f:
        json.dump({'image': img_base64}, f)
    print(f'{filename} saved')

precompute_sentiment_distribution()
precompute_review_length()
precompute_frequent_words()
print('Generating positive wordcloud...')
precompute_wordcloud('positive', 'eda_wordcloud_positive.json')
print('Generating negative wordcloud...')
precompute_wordcloud('negative', 'eda_wordcloud_negative.json')
print('All EDA files precomputed successfully')