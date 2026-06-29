import { useEffect, useState } from 'react';
import HistoryTable from '../components/HistoryTable.jsx';
import SentimentTrendChart from '../components/SentimentTrendChart.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';

const HISTORY_KEY = 'analyse_avis_history';

function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveHistory(records) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
}

function History() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

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

  const [mainRef, mainVis] = useScrollReveal();
  const [trendRef, trendVis] = useScrollReveal();
  const [tableRef, tableVis] = useScrollReveal();

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div ref={mainRef} className={`page-card scroll-reveal ${mainVis ? 'visible' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1 className="page-title">History</h1>
            <p className="page-text">
              Analyzed reviews are stored in the browser (localStorage).
            </p>
          </div>
          {records.length > 0 && (
            <button
              type="button"
              className="button-primary"
              style={{ background: '#dc2626' }}
              onClick={() => setShowConfirm(true)}
            >
              Delete All
            </button>
          )}
        </div>

        {records.length > 1 && (
          <div ref={trendRef} className={`scroll-reveal scroll-reveal-delay-1 ${trendVis ? 'visible' : ''}`} style={{ marginTop: 24 }}>
            <h3 className="section-title" style={{ fontSize: '0.95rem', marginBottom: 12 }}>
              Sentiment Trends
            </h3>
            <SentimentTrendChart records={records} />
          </div>
        )}

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
              Are you sure you want to delete all history?
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                className="button-primary"
                style={{ background: '#dc2626', padding: '10px 18px', fontSize: '0.9rem' }}
                onClick={handleDeleteAll}
              >
                Yes, delete all
              </button>
              <button
                type="button"
                className="button-primary"
                style={{ background: '#6b7280', padding: '10px 18px', fontSize: '0.9rem' }}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
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
                ? 'No history available.'
                : 'No reviews match your search.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;