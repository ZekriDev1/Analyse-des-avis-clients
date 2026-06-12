import ReviewForm from '../components/ReviewForm.jsx';

function Analysis() {
  return (
    <div>
      <h1 className="page-title">Analyse d'un avis</h1>
      <p className="page-text">
        Saisissez un avis client et obtenez immédiatement le sentiment ainsi que la confiance.
      </p>
      <div className="card-actions">
        <ReviewForm />
      </div>
    </div>
  );
}

export default Analysis;
