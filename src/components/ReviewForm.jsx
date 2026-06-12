import { useState } from 'react';
import { predictReview, saveReviewHistory } from '../services/api.js';
import Result from './Result.jsx';

function ReviewForm() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (!review.trim()) {
      setError('Veuillez saisir un avis client.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const data = await predictReview(review.trim());
      const rawConfidence = Number(data.confidence ?? data.confidence_score ?? 0);
      const confidence = rawConfidence <= 1 ? Math.round(rawConfidence * 100) : Math.round(rawConfidence);

      const historyEntry = {
        review: review.trim(),
        sentiment: data.sentiment,
        confidence,
        date: new Date().toLocaleString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      saveReviewHistory(historyEntry);
      setResult(historyEntry);
    } catch (err) {
      setError('Impossible de contacter le serveur.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-card">
      <form onSubmit={handleSubmit}>
        <label className="section-title" htmlFor="review-text">
          Avis client
        </label>
        <textarea
          id="review-text"
          className="textarea-field"
          placeholder="Écrire un avis client..."
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
        {error && <p className="page-text" style={{ color: '#b91c1c' }}>{error}</p>}
        <div className="form-row">
          <button type="submit" className="button-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Analyse en cours...' : 'Analyser'}
          </button>
        </div>
      </form>

      {result && <Result sentiment={result.sentiment} confidence={result.confidence} />}
    </div>
  );
}

export default ReviewForm;
