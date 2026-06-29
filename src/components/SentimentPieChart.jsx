import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { getStatistics } from '../services/api';

const COLORS = {
  positive: '#22c55e',
  neutral: '#6b7280',
  negative: '#ef4444',
};

export default function SentimentPieChart() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStatistics().then(setStats).catch(() => {});
  }, []);

  if (!stats) return null;

  const data = [
<<<<<<< HEAD
    { name: 'Positive', value: stats.positiveReviews || 0, color: COLORS.positive },
    { name: 'Negative', value: stats.negativeReviews || 0, color: COLORS.negative },
=======
    { name: 'Positif', value: stats.positiveReviews || 0, color: COLORS.positive },
    { name: 'Négatif', value: stats.negativeReviews || 0, color: COLORS.negative },
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
  ];

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [
              `${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`,
              '',
            ]}
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontSize: 13,
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={10}
            formatter={(value) => (
              <span style={{ color: '#374151', fontSize: 13 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}