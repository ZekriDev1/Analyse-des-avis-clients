import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';

const METRIC_COLORS = {
  accuracy: '#3b82f6',
  precision: '#8b5cf6',
  recall: '#22c55e',
  f1Score: '#f59e0b',
};

const METRIC_LABELS = {
  accuracy: 'Accuracy',
  precision: 'Precision',
  recall: 'Recall',
  f1Score: 'F1-Score',
};

export default function ModelComparisonChart({ models }) {
  if (!models || models.length === 0) return null;

  const metrics = ['accuracy', 'precision', 'recall', 'f1Score'];

  const chartData = models.map((m) => {
    const row = { model: m.model };
    metrics.forEach((met) => {
      row[met] = +(m[met] * 100).toFixed(1);
    });
    return row;
  });

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={chartData} barSize={18} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="model"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, '']}
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontSize: 13,
            }}
          />
          <Legend
            iconType="circle"
            iconSize={10}
            formatter={(value) => (
              <span style={{ color: '#374151', fontSize: 12 }}>
                {METRIC_LABELS[value] || value}
              </span>
            )}
          />
          {metrics.map((met) => (
            <Bar
              key={met}
              dataKey={met}
              name={met}
              fill={METRIC_COLORS[met]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}