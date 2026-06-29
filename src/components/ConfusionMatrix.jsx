import React, { useEffect, useState } from 'react';
import { getMetrics } from '../services/api';

function getColor(value, max) {
  const intensity = value / max;
  const r = Math.round(240 - intensity * 200);
  const g = Math.round(245 - intensity * 150);
  const b = Math.round(255 - intensity * 50);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ConfusionMatrix() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMetrics()
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(() => {
<<<<<<< HEAD
        setError('Unable to retrieve matrix data.');
=======
        setError('Impossible de récupérer les données de la matrice.');
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-6 text-sm text-gray-500 flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
<<<<<<< HEAD
        Loading...
=======
        Chargement...
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 rounded-xl bg-red-50 px-5 py-4 my-2">
        <p className="text-sm text-red-700 m-0">{error}</p>
      </div>
    );
  }

  if (!metrics || !metrics.confusion_matrix || !Array.isArray(metrics.confusion_matrix)) {
    return (
      <div className="py-6 text-sm text-gray-500">
<<<<<<< HEAD
        No data available.
=======
        Aucune donnée disponible.
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
      </div>
    );
  }

  const cm = metrics.confusion_matrix;
  const maxVal = Math.max(...cm.flat());

  const rows = [
<<<<<<< HEAD
    { label: 'Actual Positive', values: cm[0] || [0, 0] },
    { label: 'Actual Negative', values: cm[1] || [0, 0] },
  ];

  const cols = ['Predicted Positive', 'Predicted Negative'];
=======
    { label: 'Réel Positif', values: cm[0] || [0, 0] },
    { label: 'Réel Négatif', values: cm[1] || [0, 0] },
  ];

  const cols = ['Prédit Positif', 'Prédit Négatif'];
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2

  return (
    <div>
      <div
        style={{
          display: 'inline-grid',
          gridTemplateColumns: `auto repeat(${cols.length}, 100px)`,
          gap: 2,
          background: '#e5e7eb',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: '#f9fafb',
            padding: '10px 14px',
            fontWeight: 600,
            fontSize: 12,
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
<<<<<<< HEAD
          Actual \ Predicted
=======
          Réel \ Prédit
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
        </div>

        {cols.map((col) => (
          <div
            key={col}
            style={{
              background: '#f9fafb',
              padding: '10px 8px',
              fontWeight: 600,
              fontSize: 12,
              color: '#374151',
              textAlign: 'center',
            }}
          >
            {col}
          </div>
        ))}

        {rows.map((row, rIdx) => (
          <React.Fragment key={rIdx}>
            <div
              style={{
                background: '#f9fafb',
                padding: '10px 14px',
                fontWeight: 500,
                fontSize: 12,
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {row.label}
            </div>
            {row.values.map((val, cIdx) => {
              const isCorrect = rIdx === cIdx;
              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  style={{
                    background: getColor(val, maxVal),
                    padding: '14px 8px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: 16,
                    color: val > maxVal * 0.5 ? '#ffffff' : '#111827',
                  }}
                >
                  {val.toLocaleString()}
                  <div
                    style={{
                      fontWeight: 400,
                      fontSize: 11,
                      marginTop: 2,
                      opacity: val > maxVal * 0.5 ? 0.85 : 0.6,
                    }}
                  >
<<<<<<< HEAD
                    {isCorrect ? '✓ Correct' : '✗ Error'}
=======
                    {isCorrect ? '✓ Correct' : '✗ Erreur'}
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          marginTop: 16,
          padding: '14px 18px',
          background: '#f9fafb',
          borderRadius: 10,
          border: '1px solid #e5e7eb',
          fontSize: 13,
          color: '#4b5563',
          lineHeight: 1.6,
        }}
      >
<<<<<<< HEAD
        <strong style={{ color: '#111827' }}>Interpretation:</strong>
        <br />
        The diagonal cells (<strong>✓ Correct</strong>) represent correct
        predictions: true positives (top left) and true negatives (bottom right).
        The other cells (<strong>✗ Error</strong>) correspond to errors:
        false positives (top right) and false negatives (bottom left).
        The darker the color, the higher the number of samples.
=======
        <strong style={{ color: '#111827' }}>Interprétation&nbsp;:</strong>
        <br />
        Les cellules de la diagonale (<strong>✓ Correct</strong>) représentent les
        prédictions correctes&nbsp;: les vrais positifs (en haut à gauche) et les
        vrais négatifs (en bas à droite). Les autres cellules (<strong>✗ Erreur</strong>)
        correspondent aux erreurs&nbsp;: faux positifs (en haut à droite) et faux
        négatifs (en bas à gauche). Plus la couleur est foncée, plus le nombre
        d'échantillons est élevé.
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
      </div>
    </div>
  );
}