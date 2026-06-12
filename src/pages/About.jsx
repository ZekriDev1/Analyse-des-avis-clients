function About() {
  return (
    <div className="page-card">
      <h1 className="page-title">À propos du projet</h1>
      <p className="page-text">
        Ce projet présente une application de classification des avis clients grâce à un modèle de Machine Learning.
      </p>

      <div className="section-box" style={{ marginTop: '20px' }}>
        <h2 className="section-title">Points clés</h2>
        <ul className="section-list">
          <li>Dataset Kaggle contenant des avis e-commerce.</li>
          <li>Analyse de texte en Natural Language Processing.</li>
          <li>Modèle de régression logistique pour la classification.</li>
          <li>Classification des sentiments en positif et négatif.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
