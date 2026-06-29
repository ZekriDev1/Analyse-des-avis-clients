function About() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div className="page-card">
        <h1 className="page-title">Project Report — Customer Review Analysis</h1>
        <p className="page-text">
          This document presents the architecture, methodology and results of the
          sentiment classification project based on the IMDb Dataset.
        </p>
      </div>

      <div className="page-card" style={{ marginTop: 20 }}>
        <h2 className="section-title">Project Pipeline</h2>
        <p className="page-text" style={{ marginBottom: 16 }}>
          The processing flow follows this sequence:
        </p>
        <div
          style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '20px 24px',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 500,
            color: '#374151',
            lineHeight: 2,
          }}
        >
          <span style={{ color: '#3b82f6', fontWeight: 700 }}>IMDb Dataset</span>
          <span style={{ margin: '0 10px', color: '#9ca3af' }}>➔</span>
          <span style={{ color: '#059669', fontWeight: 600 }}>NLP Preprocessing</span>
          <span style={{ margin: '0 10px', color: '#9ca3af' }}>➔</span>
          <span style={{ color: '#8b5cf6', fontWeight: 600 }}>TF-IDF</span>
          <span style={{ margin: '0 10px', color: '#9ca3af' }}>➔</span>
          <span style={{ color: '#d97706', fontWeight: 600 }}>Machine Learning</span>
          <span style={{ margin: '0 10px', color: '#9ca3af' }}>➔</span>
          <span style={{ color: '#0891b2', fontWeight: 600 }}>FastAPI Backend</span>
          <span style={{ margin: '0 10px', color: '#9ca3af' }}>➔</span>
          <span style={{ color: '#dc2626', fontWeight: 600 }}>React Frontend</span>
          <span style={{ margin: '0 10px', color: '#9ca3af' }}>➔</span>
          <span style={{ color: '#111827', fontWeight: 700 }}>Result</span>
        </div>
      </div>

      <div className="page-card" style={{ marginTop: 20 }}>
        <h2 className="section-title">1. Dataset</h2>
        <p className="page-text" style={{ marginBottom: 12 }}>
          The dataset used is the <strong>IMDb Dataset</strong> (Internet Movie Database),
          from the Kaggle platform. It consists of <strong>50,000 movie reviews</strong>,
          perfectly balanced:
        </p>
        <ul className="section-list">
          <li><strong>Name:</strong> IMDb Dataset</li>
          <li><strong>Total volume:</strong> 50,000 reviews</li>
          <li><strong>Distribution:</strong> 25,000 positive / 25,000 negative</li>
          <li><strong>Source:</strong> Kaggle — IMDb Dataset of 50K Movie Reviews</li>
        </ul>

        <h3 className="section-title" style={{ marginTop: 24, fontSize: '1.05rem' }}>
          2. NLP Preprocessing
        </h3>
        <p className="page-text" style={{ marginTop: 12 }}>
          Before model training, each review goes through a cleaning pipeline:
        </p>
        <ul className="section-list">
          <li>HTML tag removal</li>
          <li>Lowercasing</li>
          <li>Punctuation and special character removal</li>
          <li>English stop word removal</li>
          <li>Lemmatization (reducing words to their root form)</li>
        </ul>

        <h3 className="section-title" style={{ marginTop: 24, fontSize: '1.05rem' }}>
          3. TF-IDF Vectorization
        </h3>
        <p className="page-text" style={{ marginTop: 12 }}>
          The cleaned texts are transformed into numerical vectors using the
          <strong> TF-IDF</strong> method (Term Frequency — Inverse Document Frequency).
          This technique weights the importance of each word in the document relative
          to the entire corpus, with the following parameters:
        </p>
        <ul className="section-list">
          <li><strong>max_features:</strong> 10,000</li>
          <li><strong>ngram_range:</strong> (1, 2) — unigrams and bigrams</li>
          <li><strong>stop_words:</strong> 'english'</li>
        </ul>
      </div>

      <div className="page-card" style={{ marginTop: 20 }}>
        <h2 className="section-title">4. Machine Learning Models</h2>
        <p className="page-text" style={{ marginBottom: 16 }}>
          Two main models were trained and compared. The dataset is split
          into 80% for training and 20% for testing, with stratification to
          preserve class balance.
        </p>

        <h3 className="section-title" style={{ fontSize: '1.05rem', marginTop: 16 }}>
          a. Support Vector Machine (SVM)
        </h3>
        <p className="page-text" style={{ marginTop: 8 }}>
          The SVM model (LinearSVC) was chosen for its ability to find an optimal
          decision boundary between classes. It offers excellent generalization
          on text data vectorized by TF-IDF. The achieved accuracy is
          <strong> 91%</strong>.
        </p>

        <h3 className="section-title" style={{ fontSize: '1.05rem', marginTop: 16 }}>
          b. Logistic Regression
        </h3>
        <p className="page-text" style={{ marginTop: 8 }}>
          Logistic Regression (LogisticRegression, solver liblinear, max_iter=1000)
          is used as a baseline model. It offers good interpretability
          and an accuracy of <strong>89%</strong>.
        </p>

        <h3 className="section-title" style={{ fontSize: '1.05rem', marginTop: 16 }}>
          c. Naive Bayes (comparison only)
        </h3>
        <p className="page-text" style={{ marginTop: 8 }}>
          The Naive Bayes classifier (MultinomialNB) is included only in the comparison
          table. It achieves an accuracy of <strong>87%</strong> but has not been
          specifically optimized.
        </p>

        <h3 className="section-title" style={{ fontSize: '1.05rem', marginTop: 16 }}>
          Evaluation Metrics
        </h3>
        <p className="page-text" style={{ marginTop: 8 }}>
          Performance is measured using Scikit-learn's classification_report,
          providing the following metrics for each model:
        </p>
        <ul className="section-list">
          <li><strong>Precision:</strong> Proportion of correct predictions among predicted positive reviews</li>
          <li><strong>Recall:</strong> Proportion of positive reviews correctly identified</li>
          <li><strong>F1-Score:</strong> Harmonic mean of precision and recall</li>
          <li><strong>Accuracy:</strong> Total proportion of correct predictions</li>
        </ul>
      </div>

      <div className="page-card" style={{ marginTop: 20 }}>
        <h2 className="section-title">ML Comparison</h2>
        <p className="page-text" style={{ marginBottom: 16 }}>
          The table below shows the comparative performance of the three models
          on the test set (20% of the IMDb dataset).
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #e5e7eb',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 600, color: '#111827' }}>
                  Model
                </th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 600, color: '#111827' }}>
                  Accuracy
                </th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 600, color: '#111827' }}>
                  Precision
                </th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 600, color: '#111827' }}>
                  Recall
                </th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 600, color: '#111827' }}>
                  F1-Score
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6', background: '#f0fdf4' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600, color: '#111827' }}>
                  SVM <span style={{ fontSize: 11, color: '#059669', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.02em', marginLeft: 8 }}>Best</span>
                </td>
                <td style={{ padding: '12px 18px', color: '#059669', fontWeight: 700 }}>91%</td>
                <td style={{ padding: '12px 18px', color: '#4b5563' }}>90%</td>
                <td style={{ padding: '12px 18px', color: '#4b5563' }}>90%</td>
                <td style={{ padding: '12px 18px', color: '#4b5563' }}>91%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600, color: '#111827' }}>
                  Logistic Regression
                </td>
                <td style={{ padding: '12px 18px', fontWeight: 700, color: '#d97706' }}>89%</td>
                <td style={{ padding: '12px 18px', color: '#4b5563' }}>89%</td>
                <td style={{ padding: '12px 18px', color: '#4b5563' }}>90%</td>
                <td style={{ padding: '12px 18px', color: '#4b5563' }}>89%</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontWeight: 600, color: '#111827' }}>
                  Naive Bayes
                </td>
                <td style={{ padding: '12px 18px', fontWeight: 700, color: '#6b7280' }}>87%</td>
                <td style={{ padding: '12px 18px', color: '#4b5563' }}>85%</td>
                <td style={{ padding: '12px 18px', color: '#4b5563' }}>88%</td>
                <td style={{ padding: '12px 18px', color: '#4b5563' }}>86%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="page-card" style={{ marginTop: 20 }}>
        <h2 className="page-title">Chapter 4: Web Application Development</h2>
        <p className="page-text" style={{ marginBottom: 20 }}>
          This chapter describes the architecture, technologies and implementation of
          the web application that allows users to interact with the sentiment
          classification model.
        </p>

        <div className="section-box" style={{ marginBottom: 20 }}>
          <h3 className="section-title">4.1 System Architecture</h3>
          <p className="page-text" style={{ marginTop: 8, marginBottom: 16 }}>
            The application follows a classic client-server architecture with two
            main components:
          </p>
          <ul className="section-list">
            <li>
              <strong>Backend (API):</strong> Developed with <strong>FastAPI</strong> in Python,
              it exposes REST endpoints for sentiment prediction, dataset statistics
              and EDA visualizations. The trained ML model (Logistic Regression
              or SVM) and the TF-IDF vectorizer are loaded into memory via joblib.
            </li>
            <li>
              <strong>Frontend:</strong> Single-page application (SPA) built with
              <strong> React.js</strong> and React Router. It consumes the API via Axios,
              with a Vite proxy redirecting requests to the backend.
            </li>
            <li>
              <strong>Database:</strong> <strong>SQLite</strong> stores the history
              of analyses performed for later review.
            </li>
          </ul>
        </div>

        <div className="section-box" style={{ marginBottom: 20 }}>
          <h3 className="section-title">4.2 Python Backend (FastAPI)</h3>
          <p className="page-text" style={{ marginTop: 8, marginBottom: 12 }}>
            The backend is developed with <strong>FastAPI</strong>, a modern Python framework
            for building REST APIs. It is deployed via Uvicorn on port 8000.
            The main responsibilities of the backend are:
          </p>
          <ul className="section-list">
            <li>Loading the ML model and TF-IDF vectorizer at startup</li>
            <li>Preprocessing and cleaning customer reviews (utils.py)</li>
            <li>Sentiment prediction via the trained model</li>
            <li>Calculating metrics and statistics (accuracy, precision, recall, F1)</li>
            <li>Generating EDA visualizations (distribution, word clouds)</li>
            <li>Managing analysis history in the SQLite database</li>
          </ul>
        </div>

        <div className="section-box" style={{ marginBottom: 20 }}>
          <h3 className="section-title">4.3 React Frontend</h3>
          <p className="page-text" style={{ marginTop: 8, marginBottom: 12 }}>
            The user interface is developed in <strong>React.js</strong> with Vite
            as the build tool. Components are organized in a modular way:
          </p>
          <ul className="section-list">
            <li><strong>src/pages/</strong> — Main pages (Home, Analysis, Dashboard, EDA, ComparisonML, History, About)</li>
            <li><strong>src/components/</strong> — Reusable components (Navbar, ReviewForm, Result, ConfusionMatrix, ModelComparisonChart)</li>
            <li><strong>src/services/</strong> — API service with Axios for backend calls</li>
            <li><strong>src/hooks/</strong> — Custom hooks (useScrollReveal for animations)</li>
          </ul>
        </div>

        <div className="section-box" style={{ marginBottom: 20 }}>
          <h3 className="section-title">4.4 API — REST Endpoints</h3>
          <p className="page-text" style={{ marginTop: 8, marginBottom: 12 }}>
            The backend exposes the following endpoints:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#111827' }}>Method</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#111827' }}>Endpoint</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#111827' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', color: '#059669', fontWeight: 600 }}>POST</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/predict</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Sentiment prediction of a review</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600 }}>GET</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/statistics</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Dataset statistics (KPI)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600 }}>GET</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/metrics</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Trained model metrics</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600 }}>GET</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/models-comparison</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Comparison of 3 ML models</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600 }}>GET</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/eda/distribution</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Sentiment distribution</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600 }}>GET</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/eda/review-length</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Review length statistics</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600 }}>GET</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/eda/frequent-words</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Most frequent words</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600 }}>GET</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/eda/wordcloud-positive</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Word cloud (positive reviews)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600 }}>GET</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/eda/wordcloud-negative</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Word cloud (negative reviews)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600 }}>GET</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/history</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Analysis history</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 14px', color: '#dc2626', fontWeight: 600 }}>DELETE</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#374151' }}>/api/history/{'{id}'}</td>
                  <td style={{ padding: '10px 14px', color: '#4b5563' }}>Delete an analysis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-box" style={{ marginBottom: 20 }}>
          <h3 className="section-title">4.5 Page Descriptions</h3>
          <ul className="section-list">
            <li>
              <strong>Home (/):</strong> Home page with project presentation,
              key statistics and sentiment distribution.
            </li>
            <li>
              <strong>Analysis (/analyse):</strong> Customer review input form.
              The user writes text in an input area and gets the predicted
              sentiment (Positive/Negative) with the associated confidence level.
            </li>
            <li>
              <strong>Statistics (/statistiques):</strong> Key indicators (KPI) of the dataset:
              total number of reviews, positive/negative reviews, satisfaction rate, model
              accuracy. Charts: pie chart distribution, satisfaction bar chart.
            </li>
            <li>
              <strong>EDA (/eda):</strong> Exploratory data analysis with 5 sections:
              sentiment distribution, review length, most frequent words,
              positive word cloud, negative word cloud.
            </li>
            <li>
              <strong>ML Comparison (/comparaison-ml):</strong> Comparison table and
              bar charts of the 3 models' performance (SVM, Logistic Regression,
              Naive Bayes) with Accuracy, Precision, Recall, F1-Score. Also displays
              the confusion matrix.
            </li>
            <li>
              <strong>History (/historique):</strong> List of previous analyses
              stored in the browser (localStorage) with visualization of sentiment
              trends over time (line chart).
            </li>
            <li>
              <strong>About (/a-propos):</strong> This page — detailed project report.
            </li>
          </ul>
        </div>

        <div className="section-box">
          <h3 className="section-title">4.6 Screenshots</h3>
          <p className="page-text" style={{ marginTop: 8, marginBottom: 16 }}>
            The screenshots below illustrate the main interfaces of
            the web application.
          </p>

          <div
            style={{
              border: '2px dashed #d1d5db',
              borderRadius: 12,
              padding: '40px 20px',
              textAlign: 'center',
              marginBottom: 16,
              background: '#f9fafb',
            }}
          >
            <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
              <strong>Screenshot 1:</strong> Home page with global dataset statistics.<br />
              <em style={{ fontSize: 12 }}>(Insert image here)</em>
            </p>
          </div>

          <div
            style={{
              border: '2px dashed #d1d5db',
              borderRadius: 12,
              padding: '40px 20px',
              textAlign: 'center',
              marginBottom: 16,
              background: '#f9fafb',
            }}
          >
            <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
              <strong>Screenshot 2:</strong> Analysis page with sentiment prediction and confidence level.<br />
              <em style={{ fontSize: 12 }}>(Insert image here)</em>
            </p>
          </div>

          <div
            style={{
              border: '2px dashed #d1d5db',
              borderRadius: 12,
              padding: '40px 20px',
              textAlign: 'center',
              marginBottom: 16,
              background: '#f9fafb',
            }}
          >
            <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
              <strong>Screenshot 3:</strong> Exploratory Data Analysis (EDA) — sentiment distribution and word clouds.<br />
              <em style={{ fontSize: 12 }}>(Insert image here)</em>
            </p>
          </div>

          <div
            style={{
              border: '2px dashed #d1d5db',
              borderRadius: 12,
              padding: '40px 20px',
              textAlign: 'center',
              background: '#f9fafb',
            }}
          >
            <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
              <strong>Screenshot 4:</strong> ML model comparison page with table and confusion matrix.<br />
              <em style={{ fontSize: 12 }}>(Insert image here)</em>
            </p>
          </div>
        </div>
      </div>

      <div className="page-card" style={{ marginTop: 20 }}>
        <h2 className="section-title">Conclusion</h2>
        <p className="page-text" style={{ marginBottom: 16 }}>
          This project enabled the development of a complete sentiment classification
          application based on the <strong>IMDb Dataset</strong> of 50,000 movie reviews.
          After thorough exploratory analysis and data preprocessing,
          two Machine Learning models were trained and compared.
        </p>
        <p className="page-text" style={{ marginBottom: 16 }}>
          The <strong>SVM (Support Vector Machine)</strong> model combined with
          <strong> TF-IDF</strong> vectorization achieved the best performance with
          <strong> 91% accuracy</strong>, surpassing Logistic Regression (89%)
          and Naive Bayes (87%).
        </p>
        <p className="page-text" style={{ marginBottom: 16 }}>
          The web interface developed in React with a FastAPI API allows users
          to submit a review and instantly get the sentiment prediction with
          the confidence level, thus facilitating automatic analysis of customer feedback
          at scale.
        </p>
        <p className="page-text" style={{ fontStyle: 'italic', color: '#6b7280', fontSize: 13 }}>
          <strong>Note:</strong> The results displayed above are the target values
          from the report. The actual results generated directly from running the project
          are available on the <strong>ML Comparison</strong> page of the application.
        </p>
      </div>

      <div className="page-card" style={{ marginTop: 20 }}>
        <h2 className="section-title">Created by:</h2>
        <p className="page-text">
          Project created by <strong>Salma ibnlfassi</strong> as part of a
          university project in Machine Learning and sentiment analysis.
        </p>
      </div>
    </div>
  );
}

export default About;