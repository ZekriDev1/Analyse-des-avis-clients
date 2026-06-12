import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="centered-panel">
      <div className="panel-card page-card">
        <h1 className="page-title">Analyse des avis</h1>
        <p className="page-text">
          Application de Machine Learning permettant de détecter automatiquement le sentiment des avis.
        </p>
        <div className="card-actions">
          <Link to="/analyse" className="button-primary">
            Analyser un avis
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
