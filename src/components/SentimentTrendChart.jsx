import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function SentimentTrendChart({ records }) {
  if (!records || records.length === 0) return null;

  const sorted = [...records].reverse();

  const grouped = {};
  sorted.forEach((r) => {
    let dateKey;
    if (r.date) {
      const parts = r.date.split(' ');
      dateKey = parts[0] || r.date;
    } else {
      dateKey = 'Inconnu';
    }
    if (!grouped[dateKey]) {
      grouped[dateKey] = { date: dateKey, positif: 0, negatif: 0, total: 0 };
    }
    const sent = String(r.sentiment || '').toLowerCase();
    if (sent.includes('posit') || sent.includes('posi')) {
      grouped[dateKey].positif += 1;
    } else if (sent.includes('negat') || sent.includes('nega')) {
      grouped[dateKey].negatif += 1;
    }
    grouped[dateKey].total += 1;
  });

  const chartData = Object.values(grouped).map((d) => ({
    date: d.date,
    Positifs: d.positif,
    Négatifs: d.negatif,
  }));

  if (chartData.length === 0) return null;

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <Tooltip
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
              <span style={{ color: '#374151', fontSize: 12 }}>{value}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="Positifs"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 3, fill: '#22c55e' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Négatifs"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 3, fill: '#ef4444' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}