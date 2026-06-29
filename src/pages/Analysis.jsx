import ReviewForm from '../components/ReviewForm.jsx';

function Analysis() {
  return (
    <div>
        <h1 className="page-title">Review Analysis</h1>
      <p className="page-text">
        Enter a customer review and instantly get the sentiment and confidence level.
      </p>
      <div className="card-actions">
        <ReviewForm />
      </div>
    </div>
  );
}

export default Analysis;
