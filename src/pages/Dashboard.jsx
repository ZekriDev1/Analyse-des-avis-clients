import { useEffect, useState } from 'react';
import { getStatistics, getMetrics } from '../services/api.js';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import useScrollReveal from '../hooks/useScrollReveal.js';

const cardStyle = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 14,
  padding: '20px 22px',
  flex: '1 1 180px',
  minWidth: 150,
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
  satisfaction: '#8b5cf6',
  accuracy: '#f59e0b',
};

const HISTORY_KEY = 'analyse_avis_history';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [historyCount, setHistoryCount] = useState(0);
  const [userPositive, setUserPositive] = useState(0);
  const [userTotal, setUserTotal] = useState(0);

  const [kpiRef, kpiVis] = useScrollReveal();
  const [pieRef, pieVis] = useScrollReveal();
  const [barRef, barVis] = useScrollReveal();
  const [historyRef, histVis] = useScrollReveal();

  useEffect(() => {
    getStatistics()
      .then(setStats)
      .catch(() => setStats(null));
    getMetrics()
      .then(setMetrics)
      .catch(() => setMetrics(null));

    const raw = localStorage.getItem(HISTORY_KEY);
    const items = raw ? JSON.parse(raw) : [];
    setHistoryCount(items.length);
    const pos = items.filter(r => {
      const s = String(r.sentiment || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return s.includes('posit') || s.includes('posi');
    }).length;
    setUserPositive(pos);
    setUserTotal(items.length);
  }, []);

  if (!stats) {
    return (
      <div className="page-card">
        <h1 className="page-title">Statistics</h1>
        <p className="page-text">Data is not yet available.</p>
      </div>
    );
  }

  const kpiItems = [
    {
      key: 'totalReviews',
      label: 'Total Reviews (Dataset)',
      value: stats.totalReviews?.toLocaleString(),
      color: colors.total,
    },
    {
      key: 'positiveReviews',
      label: 'Positive Reviews',
      value: stats.positiveReviews?.toLocaleString(),
      color: colors.positive,
    },
    {
      key: 'negativeReviews',
      label: 'Negative Reviews',
      value: stats.negativeReviews?.toLocaleString(),
      color: colors.negative,
    },
    {
      key: 'satisfactionRate',
      label: 'Satisfaction Rate',
      value: `${stats.satisfactionRate ?? '—'}%`,
      color: colors.satisfaction,
    },
  ];

  if (metrics && metrics.accuracy != null) {
    kpiItems.push({
      key: 'accuracy',
      label: 'Model Accuracy',
      value: `${metrics.accuracy}%`,
      color: colors.accuracy,
    });
  }

  const pieData = [
    {
    name: 'Positive',
      value: stats.positiveReviews || 0,
      color: '#22c55e',
    },
    {
    name: 'Negative',
      value: stats.negativeReviews || 0,
      color: '#ef4444',
    },
  ];

  const totalPie = pieData.reduce((s, d) => s + d.value, 0);

  const satisfactionData = [
    {
      name: 'Satisfaction',
      value: stats.satisfactionRate ?? 0,
      max: 100,
    },
  ];

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div
        ref={kpiRef}
        className={`page-card scroll-reveal ${kpiVis ? 'visible' : ''}`}
      >
        <h1 className="page-title">Statistics</h1>
        <p className="page-text">
          Key indicators calculated from the IMDb dataset of 50,000 reviews.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            marginTop: 20,
          }}
        >
          {kpiItems.map((item) => (
            <div key={item.key} style={cardStyle}>
              <p style={labelStyle}>{item.label}</p>
              <p style={{ ...valueStyle, color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={pieRef}
        className={`scroll-reveal scroll-reveal-delay-1 ${pieVis ? 'visible' : ''}`}
        style={{ marginTop: 20 }}
      >
        <div className="page-card">
          <h2 className="section-title">Sentiment Distribution</h2>
          <p className="page-text" style={{ marginBottom: 16 }}>
            Distribution of positive and negative reviews in the dataset.
          </p>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `${value.toLocaleString()} (${((value / totalPie) * 100).toFixed(1)}%)`,
                    '',
                  ]}
                  contentStyle={{
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    fontSize: 13,
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => (
                    <span style={{ color: '#374151', fontSize: 13 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        ref={barRef}
        className={`scroll-reveal scroll-reveal-delay-2 ${barVis ? 'visible' : ''}`}
        style={{ marginTop: 20 }}
      >
        <div className="page-card">
          <h2 className="section-title">Satisfaction Rate (IMDb Dataset)</h2>
          <p className="page-text" style={{ marginBottom: 16 }}>
            Calculated from the actual dataset data: (Positive Reviews /
            Total Reviews) × 100
          </p>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
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
                    fontSize: 13,
                  }}
                />
                <Bar
                  dataKey="value"
                  name="Satisfaction Rate"
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                  barSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
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
            <strong style={{ color: '#111827' }}>Interpretation:</strong>
            <br />
            The dataset satisfaction rate is{' '}
            <strong>{stats.satisfactionRate}%</strong>. This means{' '}
            <strong>{stats.positiveReviews?.toLocaleString()}</strong> reviews out of{' '}
            <strong>{stats.totalReviews?.toLocaleString()}</strong> are
            positive. This ratio provides an overall indication of sentiment
            distribution in the dataset.
          </div>
        </div>
      </div>

      {userTotal > 0 && (
        <div
          className={`scroll-reveal scroll-reveal-delay-2`}
          style={{ marginTop: 20 }}
        >
          <div className="page-card">
            <h2 className="section-title">Your Satisfaction Rate</h2>
            <p className="page-text" style={{ marginBottom: 16 }}>
              Calculated from your actual analyses: (Your positive reviews / Total of your analyses) × 100
            </p>
            {(() => {
              const userRate = userTotal > 0 ? Math.round((userPositive / userTotal) * 100) : 0;
              return (
                <>
                  <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer>
                      <BarChart
                      data={[{ name: 'Your analyses', value: userRate, max: 100 }]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="name"
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
                            fontSize: 13,
                          }}
                        />
                        <Bar
                          dataKey="value"
                  name="Your satisfaction"
                          fill="#3b82f6"
                          radius={[6, 6, 0, 0]}
                          barSize={60}
                        />
                      </BarChart>
                    </ResponsiveContainer>
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
                    <strong style={{ color: '#111827' }}>Your Results:</strong>
                    <br />
                    Out of <strong>{userTotal}</strong> analysis{userTotal > 1 ? 'es' : ''} performed,{' '}
                    <strong style={{ color: '#22c55e' }}>{userPositive}</strong> positive{userPositive > 1 ? '' : ''} and{' '}
                    <strong style={{ color: '#ef4444' }}>{userTotal - userPositive}</strong> negative{userTotal - userPositive > 1 ? '' : ''}.
                    Your personal satisfaction rate is{' '}
                    <strong style={{ color: '#3b82f6' }}>{userRate}%</strong>.
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      <div
        ref={historyRef}
        className={`scroll-reveal scroll-reveal-delay-3 ${histVis ? 'visible' : ''}`}
        style={{ marginTop: 20 }}
      >
        <div className="page-card">
          <h2 className="section-title">Analyses Performed</h2>
          <p className="page-text">
            Number of analyses recorded in the SQLite database.
          </p>
          <div
            style={{
              marginTop: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: '2rem',
                fontWeight: 600,
                color: '#3b82f6',
              }}
            >
              {historyCount}
            </span>
            <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>
              analysis{historyCount > 1 ? 'es' : ''} performed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;