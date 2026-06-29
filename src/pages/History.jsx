import { useEffect, useState } from 'react';
<<<<<<< HEAD
=======
import { clearReviewHistory, loadReviewHistory } from '../services/api.js';
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
import HistoryTable from '../components/HistoryTable.jsx';
import SentimentTrendChart from '../components/SentimentTrendChart.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';

<<<<<<< HEAD
const HISTORY_KEY = 'analyse_avis_history';

function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveHistory(records) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
}

=======
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
function History() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
<<<<<<< HEAD

  useEffect(() => {
    setRecords(loadHistory());
  }, []);

  const filtered = records.filter((r) => {
    if (!searchQuery.trim()) return true;
    return (r.review || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  function handleDeleteAll() {
    saveHistory([]);
    setRecords([]);
    setShowConfirm(false);
  }

=======
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    setRecords(loadReviewHistory());
  }, []);

  const filtered = records.filter((r) => {
    const matchesSearch = searchQuery.trim()
      ? r.review.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesDate = dateFilter
      ? r.date && r.date.startsWith(dateFilter)
      : true;
    return matchesSearch && matchesDate;
  });

  function handleClearAll() {
    setRecords(clearReviewHistory());
    setShowConfirm(false);
  }

  const uniqueDates = [...new Set(records.map((r) => r.date ? r.date.split(' ')[0] : '').filter(Boolean))].sort().reverse();

>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
  const [mainRef, mainVis] = useScrollReveal();
  const [trendRef, trendVis] = useScrollReveal();
  const [tableRef, tableVis] = useScrollReveal();

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div ref={mainRef} className={`page-card scroll-reveal ${mainVis ? 'visible' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
<<<<<<< HEAD
            <h1 className="page-title">History</h1>
            <p className="page-text">
              Analyzed reviews are stored in the browser (localStorage).
            </p>
=======
            <h1 className="page-title">Historique</h1>
            <p className="page-text">Les avis analysés sont enregistrés dans le stockage local du navigateur.</p>
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
          </div>
          {records.length > 0 && (
            <button
              type="button"
              className="button-primary"
              style={{ background: '#dc2626' }}
              onClick={() => setShowConfirm(true)}
            >
<<<<<<< HEAD
              Delete All
=======
              Supprimer tout l'historique
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
            </button>
          )}
        </div>

<<<<<<< HEAD
        {records.length > 1 && (
          <div ref={trendRef} className={`scroll-reveal scroll-reveal-delay-1 ${trendVis ? 'visible' : ''}`} style={{ marginTop: 24 }}>
            <h3 className="section-title" style={{ fontSize: '0.95rem', marginBottom: 12 }}>
              Sentiment Trends
=======
        {/* Trend chart */}
        {records.length > 1 && (
          <div ref={trendRef} className={`scroll-reveal scroll-reveal-delay-1 ${trendVis ? 'visible' : ''}`} style={{ marginTop: 24 }}>
            <h3 className="section-title" style={{ fontSize: '0.95rem', marginBottom: 12 }}>
              Évolution des sentiments
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
            </h3>
            <SentimentTrendChart records={records} />
          </div>
        )}

<<<<<<< HEAD
        {records.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <input
              type="text"
              className="textarea-field"
              style={{ minHeight: 'auto', height: 44, padding: '10px 14px', width: '100%' }}
              placeholder="Search for a review..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
=======
        {/* Filters */}
        {records.length > 0 && (
          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              type="text"
              className="textarea-field"
              style={{ minHeight: 'auto', height: 44, padding: '10px 14px', flex: '1 1 200px' }}
              placeholder="Rechercher un avis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {uniqueDates.length > 0 && (
              <select
                style={{
                  height: 44,
                  padding: '0 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: 12,
                  background: '#ffffff',
                  color: '#111827',
                  fontSize: 14,
                  minWidth: 140,
                }}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">Toutes les dates</option>
                {uniqueDates.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            )}
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
          </div>
        )}

        {showConfirm && (
          <div
            style={{
              marginTop: 20,
              padding: '18px 20px',
              border: '1px solid #fecaca',
              borderRadius: 12,
              background: '#fef2f2',
            }}
          >
            <p style={{ margin: '0 0 14px', color: '#b91c1c', fontSize: '0.95rem' }}>
<<<<<<< HEAD
              Are you sure you want to delete all history?
=======
              Êtes-vous sûr de vouloir supprimer tout l'historique&nbsp;?
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                className="button-primary"
                style={{ background: '#dc2626', padding: '10px 18px', fontSize: '0.9rem' }}
<<<<<<< HEAD
                onClick={handleDeleteAll}
              >
                Yes, delete all
=======
                onClick={handleClearAll}
              >
                Oui, tout supprimer
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
              </button>
              <button
                type="button"
                className="button-primary"
                style={{ background: '#6b7280', padding: '10px 18px', fontSize: '0.9rem' }}
                onClick={() => setShowConfirm(false)}
              >
<<<<<<< HEAD
                Cancel
=======
                Annuler
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
              </button>
            </div>
          </div>
        )}

        <div ref={tableRef} className={`scroll-reveal scroll-reveal-delay-2 ${tableVis ? 'visible' : ''}`} style={{ marginTop: 22 }}>
          {filtered.length > 0 ? (
            <HistoryTable records={filtered} />
          ) : (
            <p className="history-empty">
              {records.length === 0
<<<<<<< HEAD
                ? 'No history available.'
                : 'No reviews match your search.'}
=======
                ? 'Aucun historique disponible.'
                : 'Aucun avis ne correspond à votre recherche.'}
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;