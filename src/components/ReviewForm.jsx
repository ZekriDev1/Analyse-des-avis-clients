import { useState } from 'react';
import { predictReview } from '../services/api.js';
import Result from './Result.jsx';

const HISTORY_KEY = 'analyse_avis_history';

const POSITIVE_EXAMPLES = [
  "This movie was absolutely fantastic! The acting was brilliant, the story kept me on the edge of my seat, and the cinematography was stunning. I would highly recommend it to anyone who loves great cinema.",
  "An absolute masterpiece! The director did an incredible job bringing this story to life. Every scene was beautifully crafted and the performances were top-notch. Definitely one of the best films I've seen this year.",
  "I loved every minute of this film. The characters were so well-developed and the plot twists kept me guessing until the very end. The soundtrack was perfect too. 10/10 would watch again!",
  "What a delightful surprise! This film exceeded all my expectations. The humor was clever, the emotional moments hit hard, and the cast had amazing chemistry together. A must-see!",
  "Brilliantly written and superbly acted. This movie manages to be both entertaining and thought-provoking. The ending left me speechless. I can't recommend it enough.",
  "Absolutely loved it! The visuals were stunning, the story was engaging, and the acting was superb. This is the kind of movie that reminds you why cinema is such a powerful medium.",
  "A truly wonderful film that stays with you long after the credits roll. The performances are outstanding, especially the lead actor who delivers a career-defining role. A triumph!",
  "This movie is a gem. From start to finish it captivated me with its beautiful storytelling and memorable characters. The cinematography alone is worth the price of admission.",
  "One of the best movies I have ever seen. The script is tight, the direction is flawless, and every actor brings their A-game. An emotional rollercoaster in the best possible way.",
  "Simply outstanding! This film has everything — great acting, a compelling story, beautiful music, and stunning visuals. It made me laugh, cry, and think. Pure cinema magic.",
];

const NEGATIVE_EXAMPLES = [
  "What a waste of time. The plot made no sense, the characters were poorly developed, and the dialogue was terrible. I could barely sit through the whole thing. One of the worst movies I have ever seen.",
  "This film was a complete disaster. The pacing was awful, the acting felt forced, and the story went absolutely nowhere. I kept waiting for it to get better but it never did.",
  "I cannot believe I spent money on this. The script was lazy, the direction was uninspired, and the special effects looked like they were from twenty years ago. Avoid at all costs.",
  "Terribly boring from start to finish. The characters were one-dimensional, the plot was predictable, and the dialogue was cringeworthy. I almost walked out of the theater.",
  "What a mess of a movie. Nothing makes sense, the editing was choppy, and the performances were wooden. This film has no idea what it wants to be and fails at everything it attempts.",
  "Painfully bad. The acting was amateurish, the story was full of holes, and the production value was embarrassing. I genuinely cannot find a single positive thing to say about this film.",
  "This might be the worst film I have ever seen. The plot is incoherent, the characters are unlikeable, and it is painfully long despite having nothing interesting to say. Complete waste.",
  "Dreadful from beginning to end. The direction was confusing, the screenplay was riddled with clichés, and the acting felt like a high school play. A total disappointment.",
  "Absolutely terrible. Nothing works in this movie — the jokes fall flat, the drama is unconvincing, and the action scenes are poorly choreographed. A complete failure on every level.",
  "I want my time back. This film is boring, predictable, and utterly forgettable. The characters are paper-thin, the story goes nowhere, and the ending is laughably bad.",
];

function getRandomPositive() {
  return POSITIVE_EXAMPLES[Math.floor(Math.random() * POSITIVE_EXAMPLES.length)];
}

function getRandomNegative() {
  return NEGATIVE_EXAMPLES[Math.floor(Math.random() * NEGATIVE_EXAMPLES.length)];
}

function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveHistory(records) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(records.slice(0, 50)));
}

function ReviewForm() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (!review.trim()) {
      setError('Please enter a customer review.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const data = await predictReview(review.trim());
      const rawConfidence = Number(data.confidence ?? data.confidence_score ?? 0);
      const confidence = rawConfidence <= 1 ? Math.round(rawConfidence * 100) : Math.round(rawConfidence);

      const entry = {
        review: review.trim(),
        sentiment: data.sentiment,
        confidence,
        date: new Date().toLocaleString('fr-FR', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit'
        })
      };

      const history = loadHistory();
      saveHistory([entry, ...history]);

      setResult(entry);
    } catch (err) {
      setError('Unable to reach the server.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-card">
      <form onSubmit={handleSubmit}>
        <label className="section-title" htmlFor="review-text">
          Customer Review
        </label>

        <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setReview(getRandomPositive())}
            style={{
              fontSize: 12,
              padding: '6px 14px',
              borderRadius: 20,
              border: '1px solid #86efac',
              background: '#f0fdf4',
              color: '#166534',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#dcfce7'; e.currentTarget.style.borderColor = '#22c55e'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.borderColor = '#86efac'; }}
          >
             Random Positive Review
          </button>
          <button
            type="button"
            onClick={() => setReview(getRandomNegative())}
            style={{
              fontSize: 12,
              padding: '6px 14px',
              borderRadius: 20,
              border: '1px solid #fca5a5',
              background: '#fef2f2',
              color: '#991b1b',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.borderColor = '#ef4444'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fca5a5'; }}
          >
             Random Negative Review
          </button>
        </div>

        <textarea
          id="review-text"
          className="textarea-field"
          placeholder="Write a customer review..."
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
        {error && <p className="page-text" style={{ color: '#b91c1c' }}>{error}</p>}
        <div className="form-row">
          <button type="submit" className="button-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {result && <Result sentiment={result.sentiment} confidence={result.confidence} />}
    </div>
  );
}

export default ReviewForm;