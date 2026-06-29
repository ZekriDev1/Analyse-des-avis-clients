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
}