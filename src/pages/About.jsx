function About() {
  return (
    <div className="page-card">
      <h1 className="page-title">À propos du projet</h1>
      <p className="page-text">
        Ce projet présente une application de classification des avis clients grâce à un modèle de Machine Learning.
      </p>

      <div className="section-box" style={{ marginTop: '20px' }}>
        <h2 className="section-title">Points clés:</h2>
        <ul className="section-list">
          <li>Dataset Kaggle contenant des avis e-commerce.</li>
          <li>Analyse de texte en Natural Language Processing.</li>
          <li>Modèle de régression logistique pour la classification.</li>
          <li>Classification des sentiments en positif et négatif.</li>
        </ul>
      </div>
      <div className="section-box" style={{ marginTop: '20px' }}>
  <h2 className="section-title">Stack utilisée:</h2>
  <ul className="section-list">
    <li><strong>Frontend :</strong> React.js, React Router, Axios, CSS</li>
    <li><strong>Backend :</strong> Python, FastAPI, Uvicorn</li>
    <li><strong>Machine Learning :</strong> Scikit-learn</li>
    <li><strong>Algorithmes :</strong> Logistic Regression, Naive Bayes, SVM</li>
    <li><strong>Prétraitement :</strong> TF-IDF, NLP (Traitement du langage naturel)</li>
    <li><strong>Dataset :</strong> IMDb Dataset of 50K Movie Reviews (Kaggle)</li>
    <li><strong>Stockage local :</strong> LocalStorage pour l'historique des analyses</li>
  </ul>
</div>
<div className="section-box" style={{ marginTop: '20px' }}>
  <h2 className="section-title">Créé par:</h2>
  <p className="page-text">
    Projet réalisé par <strong>Salma</strong> dans le cadre d'un projet universitaire de Machine Learning et d'analyse des sentiments.
  </p>
</div>
    </div>
  );
}

export default About;
