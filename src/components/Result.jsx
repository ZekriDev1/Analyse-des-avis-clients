function Result({ sentiment, confidence }) {
  const sentimentKey = String(sentiment).toLowerCase();
  const isPositive = sentimentKey.includes('posit') || sentimentKey.includes('posi');
  const isNegative = sentimentKey.includes('negat') || sentimentKey.includes('nega');
  const isNeutral = sentimentKey.includes('neut');

  let dotColor;
  if (isPositive) dotColor = '#22c55e';
  else if (isNegative) dotColor = '#ef4444';
  else dotColor = '#6b7280';

  let barColor;
  const norm = Math.min(100, Math.max(0, Number(confidence) || 0));
  if (norm < 50) barColor = '#fbbf24';
  else if (norm < 80) barColor = '#22c55e';
  else barColor = '#16a34a';

  return (
    <aside className="result-card">
      <p className="result-label">Résultat</p>
      <div className="sentiment-row">
        <span className="sentiment-dot" style={{ backgroundColor: dotColor }}></span>
        <span className="result-value">{sentiment}</span>
      </div>
      <p className="result-label" style={{ marginTop: '16px' }}>Confiance</p>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${norm}%`, backgroundColor: barColor }}
        ></div>
      </div>
    </aside>
  );
}

export default Result;