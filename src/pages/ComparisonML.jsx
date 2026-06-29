import { useEffect, useState } from 'react';
import { getModelsComparison } from '../services/api';
import ModelComparisonChart from '../components/ModelComparisonChart.jsx';
import ConfusionMatrix from '../components/ConfusionMatrix.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';

function ComparisonML() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getModelsComparison()
      .then((data) => {
        const mapped = (data.models || []).map((m) => ({
          model: m.name,
          accuracy: m.accuracy,
          precision: m.precision,
          recall: m.recall,
          f1Score: m.f1_score,
        }));
        setModels(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to reach the server.');
        setLoading(false);
      });
  }, []);

  const bestModel =
    models.length > 0
      ? models.reduce((best, m) => (m.f1Score > best.f1Score ? m : best))
      : null;

  const [headerRef, headerVis] = useScrollReveal();
  const [chartRef, chartVis] = useScrollReveal();
  const [tableRef, tableVis] = useScrollReveal();
  const [bestRef, bestVis] = useScrollReveal();
  const [cmRef, cmVis] = useScrollReveal();

  if (loading) {
    return (
      <div className="page-card">
        <h1 className="page-title">Model Comparison</h1>
        <div className="mt-8 space-y-3">
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-card">
        <h1 className="page-title">Model Comparison</h1>
        <div className="mt-6 border border-red-200 rounded-xl bg-red-50 px-5 py-4">
          <p className="text-sm text-red-700 m-0">{error}</p>
        </div>
      </div>
    );
  }

  const metricLabel = (key) => {
    const labels = {
      accuracy: 'Accuracy',
      precision: 'Precision',
      recall: 'Recall',
      f1Score: 'F1-Score',
    };
    return labels[key] || key;
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div ref={headerRef} className={`page-card scroll-reveal ${headerVis ? 'visible' : ''}`}>
        <h1 className="page-title">Model Comparison</h1>
        <p className="page-text">
          This comparison helps select the best performing model for
          automatic sentiment analysis.
        </p>
      </div>

      {models.length > 0 && (
        <div ref={chartRef} className={`scroll-reveal scroll-reveal-delay-1 ${chartVis ? 'visible' : ''}`} style={{ marginTop: 20 }}>
          <div className="page-card">
            <h2 className="section-title">Performance by Metric</h2>
            <ModelComparisonChart models={models} />
          </div>
        </div>
      )}

      <div ref={tableRef} className={`scroll-reveal scroll-reveal-delay-2 ${tableVis ? 'visible' : ''}`} style={{ marginTop: 20 }}>
        <div className="page-card" style={{ padding: 0 }}>
          <table className="w-full border-collapse text-sm" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#111827' }}>
                  Model
                </th>
                {['accuracy', 'precision', 'recall', 'f1Score'].map((key) => (
                  <th
                    key={key}
                    style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 400, color: '#6b7280' }}
                  >
                    {metricLabel(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {models.map((m, i) => (
                <tr
                  key={m.model}
                  style={{
                    borderBottom: i < models.length - 1 ? '1px solid #f3f4f6' : 'none',
                    background: m === bestModel ? '#f9fafb' : 'transparent',
                  }}
                >
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: '#111827' }}>
                    {m.model}
                    {m === bestModel && (
                      <span style={{ marginLeft: 8, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#6b7280', fontWeight: 400 }}>
                        Best
                      </span>
                    )}
                  </td>
                  {['accuracy', 'precision', 'recall', 'f1Score'].map((key) => (
                    <td key={key} style={{ padding: '14px 20px', color: '#4b5563' }}>
                      {(m[key] * 100).toFixed(0)}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {bestModel && (
        <div ref={bestRef} className={`scroll-reveal scroll-reveal-delay-3 ${bestVis ? 'visible' : ''}`} style={{ marginTop: 20 }}>
          <div className="page-card">
            <p style={{ margin: 0, fontSize: 14, color: '#4b5563' }}>
              <strong style={{ color: '#111827' }}>Best Model:</strong>{' '}
              {bestModel.model}
              <span style={{ color: '#9ca3af' }}>
                {' '}— Highest F1-Score ({ (bestModel.f1Score * 100).toFixed(0)}% )
              </span>
            </p>
          </div>
        </div>
      )}

      <div ref={cmRef} className={`scroll-reveal scroll-reveal-delay-4 ${cmVis ? 'visible' : ''}`} style={{ marginTop: 20 }}>
        <div className="page-card">
          <h2 className="section-title">Confusion Matrix</h2>
          <p className="page-text" style={{ marginBottom: 18 }}>
            Matrix of the best model ({bestModel?.model || 'Logistic Regression'})
          </p>
          <ConfusionMatrix />
        </div>
      </div>
    </div>
  );
}

export default ComparisonML;