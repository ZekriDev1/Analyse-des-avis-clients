function Result({ sentiment, confidence }) {
  const sentimentKey = String(sentiment).toLowerCase();
  const statusClass = sentimentKey.includes('posit') || sentimentKey.includes('posi')
    ? 'status-positive'
    : 'status-negative';

  return (
    <aside className="result-card">
      <p className="result-label">Résultat</p>
      <p className={`result-value ${statusClass}`}>{sentiment}</p>
      <p className="result-label" style={{ marginTop: '16px' }}>Confiance</p>
      <p className="result-value">{confidence}%</p>
    </aside>
  );
}

export default Result;
