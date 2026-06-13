import sqlite3
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / 'database.db'

CREATE_TABLE_SQL = '''
CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    review TEXT NOT NULL,
    sentiment TEXT NOT NULL,
    confidence REAL NOT NULL,
    created_at TEXT NOT NULL
)
'''


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    conn = get_connection()
    try:
        conn.execute(CREATE_TABLE_SQL)
        conn.commit()
    finally:
        conn.close()


def insert_prediction(review: str, sentiment: str, confidence: float) -> dict:
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M')
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO predictions (review, sentiment, confidence, created_at) VALUES (?, ?, ?, ?)',
            (review, sentiment, confidence, created_at),
        )
        conn.commit()
        prediction_id = cursor.lastrowid
        return {
            'id': prediction_id,
            'review': review,
            'sentiment': sentiment,
            'confidence': round(confidence, 1),
            'created_at': created_at,
        }
    finally:
        conn.close()


def fetch_history() -> list[dict]:
    conn = get_connection()
    try:
        cursor = conn.execute('SELECT id, review, sentiment, confidence, created_at FROM predictions ORDER BY id DESC')
        return [dict(row) for row in cursor.fetchall()]
    finally:
        conn.close()


def delete_history_item(item_id: int) -> bool:
    conn = get_connection()
    try:
        cursor = conn.execute('DELETE FROM predictions WHERE id = ?', (item_id,))
        conn.commit()
        return cursor.rowcount > 0
    finally:
        conn.close()
