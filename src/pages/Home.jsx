import { Link } from 'react-router-dom';
import StatisticsCards from '../components/StatisticsCards.jsx';
import SentimentPieChart from '../components/SentimentPieChart.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';

function Home() {
  const [heroRef, heroVis] = useScrollReveal();
  const [statsRef, statsVis] = useScrollReveal();
  const [chartRef, chartVis] = useScrollReveal();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div ref={heroRef} className={`page-card scroll-reveal ${heroVis ? 'visible' : ''}`} style={{ textAlign: 'center' }}>
        <h1 className="page-title">Review Analysis</h1>
        <p className="page-text">
          Machine Learning application for automatically detecting review sentiment.
        </p>
        <div className="card-actions">
          <Link to="/analyse" className="button-primary">
            Analyze a review
          </Link>
        </div>
      </div>

      <div ref={statsRef} className={`scroll-reveal scroll-reveal-delay-1 ${statsVis ? 'visible' : ''}`} style={{ marginTop: 28 }}>
        <div className="page-card">
          <h2 className="section-title">Model Statistics</h2>
          <StatisticsCards />
        </div>
      </div>

      <div ref={chartRef} className={`scroll-reveal scroll-reveal-delay-2 ${chartVis ? 'visible' : ''}`} style={{ marginTop: 20 }}>
        <div className="page-card">
          <h2 className="section-title">Sentiment Distribution</h2>
          <SentimentPieChart />
        </div>
      </div>
    </div>
  );
}

export default Home;
