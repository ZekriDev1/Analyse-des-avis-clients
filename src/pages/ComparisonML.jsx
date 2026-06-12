import { useEffect, useState } from 'react';
import { getModelsComparison } from '../services/api';

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
        setError('Impossible de contacter le serveur.');
        setLoading(false);
      });
  }, []);

  const bestModel =
    models.length > 0
      ? models.reduce((best, m) => (m.f1Score > best.f1Score ? m : best))
      : null;

  if (loading) {
    return (
      <div className="page-card">
        <h1 className="page-title">Comparaison des modèles</h1>
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
        <h1 className="page-title">Comparaison des modèles</h1>
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
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight m-0">
          Comparaison des modèles
        </h1>
        <p className="mt-3 text-base leading-relaxed text-gray-500 m-0">
          Cette comparaison permet de choisir le modèle le plus performant pour
          l'analyse automatique des sentiments.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-5 text-left font-medium text-gray-900">
                Modèle
              </th>
              {['accuracy', 'precision', 'recall', 'f1Score'].map((key) => (
                <th
                  key={key}
                  className="py-4 px-5 text-left font-medium text-gray-400 font-normal"
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
                className={`border-b border-gray-50 ${
                  m === bestModel ? 'bg-gray-50/60' : ''
                }`}
              >
                <td className="py-4 px-5 font-medium text-gray-900">
                  {m.model}
                  {m === bestModel && (
                    <span className="ml-2 text-[11px] uppercase tracking-wider text-gray-400 font-normal">
                      Meilleur
                    </span>
                  )}
                </td>
                {['accuracy', 'precision', 'recall', 'f1Score'].map((key) => (
                  <td key={key} className="py-4 px-5 text-gray-600 tabular-nums">
                    {(m[key] * 100).toFixed(0)}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best model card */}
      {bestModel && (
        <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
          <p className="text-sm text-gray-500 m-0">
            <span className="font-medium text-gray-900">Meilleur modèle :</span>{' '}
            {bestModel.model}
            <span className="text-gray-400">
              {' '}— F1-Score le plus élevé ({' '}
              {(bestModel.f1Score * 100).toFixed(0)}% )
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ComparisonML;