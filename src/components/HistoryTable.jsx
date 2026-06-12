const sentimentColors = {
  positive: '#22c55e',
  negatif: '#ef4444',
  negative: '#ef4444',
  neutre: '#6b7280',
  neutral: '#6b7280',
};

function HistoryTable({ records }) {
  if (!records.length) {
    return <p className="history-empty">Aucun historique disponible.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="history-table">
        <thead>
          <tr>
            <th>Avis</th>
            <th>Sentiment</th>
            <th>Confiance</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, index) => {
            const sentKey = String(item.sentiment || '').toLowerCase();
            const color = sentimentColors[sentKey] || '#6b7280';
            const conf = Number(item.confidence) || 0;
            let barColor = '#fbbf24';
            if (conf >= 80) barColor = '#16a34a';
            else if (conf >= 50) barColor = '#22c55e';
            return (
              <tr key={`${item.date}-${index}`}>
                <td style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.review}</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, display: 'inline-block', flexShrink: 0 }}></span>
                    {item.sentiment}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60, height: 6, background: '#e5e7eb', borderRadius: 999, overflow: 'hidden', flexShrink: 0 }}>
                      <div style={{ width: `${conf}%`, height: '100%', background: barColor, borderRadius: 999 }}></div>
                    </div>
                    <span style={{ fontSize: 13, color: '#6b7280' }}>{conf}%</span>
                  </div>
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{item.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
