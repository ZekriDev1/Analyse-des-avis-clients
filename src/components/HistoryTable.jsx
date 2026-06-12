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
          {records.map((item, index) => (
            <tr key={`${item.date}-${index}`}>
              <td>{item.review}</td>
              <td>{item.sentiment}</td>
              <td>{item.confidence}%</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;