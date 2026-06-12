import { useEffect, useState } from 'react';
import { clearReviewHistory, loadReviewHistory } from '../services/api.js';
import HistoryTable from '../components/HistoryTable.jsx';

function History() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setRecords(loadReviewHistory());
  }, []);

  const filtered = searchQuery.trim()
    ? records.filter((r) =>
        r.review.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : records;

  function handleClearAll() {
    setRecords(clearReviewHistory());
    setShowConfirm(false);
  }

  return (
    <div className="page-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 className="page-title">Historique</h1>
          <p className="page-text">Les avis analysés sont enregistrés dans le stockage local du navigateur.</p>
        </div>
        {records.length > 0 && (
          <button
            type="button"
            className="button-primary"
            style={{ background: '#dc2626' }}
            onClick={() => setShowConfirm(true)}
          >
            Supprimer tout l'historique
          </button>
        )}
      </div>

      {records.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            className="textarea-field"
            style={{ minHeight: 'auto', height: '44px', padding: '10px 14px' }}
            placeholder="Rechercher un avis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {showConfirm && (
        <div
          style={{
            marginTop: '20px',
            padding: '18px 20px',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            background: '#fef2f2',
          }}
        >
          <p style={{ margin: '0 0 14px', color: '#b91c1c', fontSize: '0.95rem' }}>
            Êtes-vous sûr de vouloir supprimer tout l'historique&nbsp;?
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="button-primary"
              style={{ background: '#dc2626', padding: '10px 18px', fontSize: '0.9rem' }}
              onClick={handleClearAll}
            >
              Oui, tout supprimer
            </button>
            <button
              type="button"
              className="button-primary"
              style={{ background: '#6b7280', padding: '10px 18px', fontSize: '0.9rem' }}
              onClick={() => setShowConfirm(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '22px' }}>
        {filtered.length > 0 ? (
          <HistoryTable records={filtered} />
        ) : (
          <p className="history-empty">
            {records.length === 0
              ? 'Aucun historique disponible.'
              : 'Aucun avis ne correspond à votre recherche.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default History;