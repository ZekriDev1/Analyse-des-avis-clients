import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function predictReview(review) {
  const response = await api.post('/predict', { review });
  return response.data;
}

const HISTORY_KEY = 'sentiment_analysis_history';

export function loadReviewHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveReviewHistory(record) {
  const history = loadReviewHistory();
  const next = [record, ...history].slice(0, 30);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export function clearReviewHistory() {
  localStorage.removeItem(HISTORY_KEY);
  return [];
}

export async function getModelsComparison() {
  const response = await api.get('/models-comparison');
  return response.data;
}

export async function getStatistics() {
  const response = await api.get('/statistics');
  return response.data;
}

export async function getMetrics() {
  const response = await api.get('/metrics');
  return response.data;
}