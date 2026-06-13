from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC


def evaluate_models(reviews, labels):
    X_train, X_test, y_train, y_test = train_test_split(
        reviews,
        labels,
        test_size=0.2,
        random_state=42,
        stratify=labels,
    )

    vectorizer = TfidfVectorizer(max_features=10000, ngram_range=(1, 2), stop_words='english')
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)

    models = [
        ('Logistic Regression', LogisticRegression(max_iter=1000, solver='liblinear')),
        ('Naive Bayes', MultinomialNB()),
        ('SVM', LinearSVC(max_iter=2000)),
    ]

    comparison = []
    for name, model in models:
        model.fit(X_train_tfidf, y_train)
        y_pred = model.predict(X_test_tfidf)
        comparison.append(
            {
                'name': name,
                'accuracy': round(float(accuracy_score(y_test, y_pred)), 4),
                'precision': round(float(precision_score(y_test, y_pred, pos_label='Positif', zero_division=0)), 4),
                'recall': round(float(recall_score(y_test, y_pred, pos_label='Positif', zero_division=0)), 4),
                'f1_score': round(float(f1_score(y_test, y_pred, pos_label='Positif', zero_division=0)), 4),
            }
        )

    return {'models': comparison}