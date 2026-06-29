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

<<<<<<< HEAD
=======
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

>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
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
<<<<<<< HEAD
}

export async function getSentimentDistribution() {
  const response = await api.get('/eda/distribution');
  return response.data;
}

export async function getReviewLength() {
  const response = await api.get('/eda/review-length');
  return response.data;
}

export async function getFrequentWords() {
  const response = await api.get('/eda/frequent-words');
  return response.data;
}

export async function getWordcloudPositive() {
  const response = await api.get('/eda/wordcloud-positive');
  return response.data;
}

export async function getWordcloudNegative() {
  const response = await api.get('/eda/wordcloud-negative');
  return response.data;
=======
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
}