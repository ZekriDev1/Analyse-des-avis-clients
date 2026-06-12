import { useEffect, useState } from 'react';
import { getStatistics, getMetrics } from '../services/api';

const cardStyle = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 14,
  padding: '20px 22px',
  boxShadow: '0 1px 4px rgba(15,23,42,0.06)',
  flex: '1 1 160px',
  minWidth: 140,
};

const labelStyle = {
  margin: 0,
  fontSize: '0.8rem',
  fontWeight: 500,
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
};

const valueStyle = {
  margin: '6px 0 0',
  fontSize: '1.6rem',
  fontWeight: 600,
  color: '#111827',
};

const colors = {
  total: '#3b82f6',
  positive: '#22c55e',
  negative: '#ef4444',
  accuracy: '#8b5cf6',
};

export default function StatisticsCards() {
  const [stats, setStats] = useState(null);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getStatistics().then(setStats).catch(() => {});
    getMetrics().then(setMetrics).catch(() => {});
  }, []);

  if (!stats) return null;

  const items = [
    { key: 'totalReviews', label: 'Total Avis', color: colors.total },
    { key: 'positiveReviews', label: 'Positifs', color: colors.positive },
    { key: 'negativeReviews', label: 'Négatifs', color: colors.negative },
  ];

  const accuracy = metrics ? metrics.accuracy : null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
      {items.map((item) => (
        <div key={item.key} style={cardStyle}>
          <p style={labelStyle}>{item.label}</p>
          <p style={{ ...valueStyle, color: item.color }}>
            {(stats[item.key] ?? 0).toLocaleString()}
          </p>
        </div>
      ))}
      <div style={cardStyle}>
        <p style={labelStyle}>Précision Modèle</p>
        <p style={{ ...valueStyle, color: colors.accuracy }}>
          {accuracy != null ? `${accuracy}%` : '—'}
        </p>
      </div>
    </div>
  );
}