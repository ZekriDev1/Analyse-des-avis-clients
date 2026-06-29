import { useEffect, useState } from 'react';
import {
  getSentimentDistribution,
  getReviewLength,
  getFrequentWords,
  getWordcloudPositive,
  getWordcloudNegative,
} from '../services/api.js';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import useScrollReveal from '../hooks/useScrollReveal.js';

const wordColors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

function EDA() {
  const [distribution, setDistribution] = useState(null);
  const [reviewLength, setReviewLength] = useState(null);
  const [frequentWords, setFrequentWords] = useState(null);
  const [wordcloudPos, setWordcloudPos] = useState(null);
  const [wordcloudNeg, setWordcloudNeg] = useState(null);
  const [loading, setLoading] = useState(true);

  const [distRef, distVis] = useScrollReveal();
  const [lenRef, lenVis] = useScrollReveal();
  const [wordsRef, wordsVis] = useScrollReveal();
  const [wcPosRef, wcPosVis] = useScrollReveal();
  const [wcNegRef, wcNegVis] = useScrollReveal();

  useEffect(() => {
    Promise.all([
      getSentimentDistribution().catch(() => null),
      getReviewLength().catch(() => null),
      getFrequentWords().catch(() => null),
      getWordcloudPositive().catch(() => null),
      getWordcloudNegative().catch(() => null),
    ]).then(([dist, len, words, wcPos, wcNeg]) => {
      setDistribution(dist);
      setReviewLength(len);
      setFrequentWords(words);
      setWordcloudPos(wcPos?.image || null);
      setWordcloudNeg(wcNeg?.image || null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="page-card">
        <h1 className="page-title">Exploratory Data Analysis</h1>
        <p className="page-text">Loading data...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div
        ref={distRef}
        className={`page-card scroll-reveal ${distVis ? 'visible' : ''}`}
      >
        <h1 className="page-title">Exploratory Data Analysis (EDA)</h1>
        <p className="page-text">
          Statistical analysis of the IMDb dataset of 50,000 reviews to understand the
          distribution, structure and characteristics of the data.
        </p>
      </div>

      <div
        ref={lenRef}
        className={`scroll-reveal scroll-reveal-delay-1 ${lenVis ? 'visible' : ''}`}
        style={{ marginTop: 20 }}
      >
        <div className="page-card">
          <h2 className="section-title">1. Sentiment Distribution</h2>
          <p className="page-text" style={{ marginBottom: 16 }}>
            The dataset contains <strong>{distribution?.total?.toLocaleString()}</strong> reviews
            including <strong style={{ color: '#22c55e' }}>{distribution?.positive?.toLocaleString()} positive</strong> and{' '}
            <strong style={{ color: '#ef4444' }}>{distribution?.negative?.toLocaleString()} negative</strong>.
            The distribution is perfectly balanced (50/50), which is
            ideal for training a binary classification model.
          </p>
          {distribution && (
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart
                  data={[
                    { name: 'Positive', value: distribution.positive, color: '#22c55e' },
                    { name: 'Negative', value: distribution.negative, color: '#ef4444' },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [value.toLocaleString(), '']}
                    contentStyle={{
                      borderRadius: 10,
                      border: '1px solid #e5e7eb',
                      fontSize: 13,
                    }}
                  />
                  <Bar dataKey="value" name="Number of reviews" radius={[6, 6, 0, 0]}>
                    {[
                      { name: 'Positive', value: distribution.positive, color: '#22c55e' },
                      { name: 'Negative', value: distribution.negative, color: '#ef4444' },
                    ].map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
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
            A balanced dataset avoids bias toward a dominant class. This
            allows the model to learn to recognize both classes
            fairly, which improves prediction reliability.
          </div>
        </div>
      </div>

      {reviewLength && (
        <div
          ref={wordsRef}
          className={`scroll-reveal scroll-reveal-delay-2 ${wordsVis ? 'visible' : ''}`}
          style={{ marginTop: 20 }}
        >
          <div className="page-card">
            <h2 className="section-title">
              2. Review Length Distribution
            </h2>
            <p className="page-text" style={{ marginBottom: 16 }}>
              Reviews contain an average of{' '}
              <strong>{reviewLength.mean_word_count}</strong> words (median:{' '}
              <strong>{reviewLength.median_word_count}</strong>). The length
              ranges from <strong>{reviewLength.min_word_count}</strong> to{' '}
              <strong>{reviewLength.max_word_count}</strong> words.
            </p>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={reviewLength.distribution || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [value.toLocaleString(), "Number of reviews"]}
                    contentStyle={{
                      borderRadius: 10,
                      border: '1px solid #e5e7eb',
                      fontSize: 13,
                    }}
                  />
                  <Bar
                    dataKey="count"
                    name="Number of reviews"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
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
            The majority of reviews contain between 51 and 200 words. Very long
            reviews ({'>'}500 words) are rare. This information is useful
            for preprocessing: a maximum size can be set for the
            TF-IDF vectorizer to avoid noise from exceptionally long
            reviews.
            </div>
          </div>
        </div>
      )}

      {frequentWords && frequentWords.words && (
        <div
          ref={wcPosRef}
          className={`scroll-reveal scroll-reveal-delay-3 ${wcPosVis ? 'visible' : ''}`}
          style={{ marginTop: 20 }}
        >
          <div className="page-card">
            <h2 className="section-title">
              3. Most Frequent Words (after stop word removal)
            </h2>
            <p className="page-text" style={{ marginBottom: 16 }}>
              The most common words after text cleaning and removal
              of stop words.
            </p>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <BarChart
                  data={frequentWords.words.slice(0, 15)}
                  layout="vertical"
                  margin={{ left: 80, right: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="word"
                    tick={{ fontSize: 11, fill: '#374151' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                    width={70}
                  />
                  <Tooltip
                    formatter={(value) => [value.toLocaleString(), 'Occurrences']}
                    contentStyle={{
                      borderRadius: 10,
                      border: '1px solid #e5e7eb',
                      fontSize: 13,
                    }}
                  />
                  <Bar dataKey="count" name="Occurrences" radius={[0, 4, 4, 0]}>
                    {(frequentWords.words.slice(0, 15) || []).map((_, i) => (
                      <Cell key={i} fill={wordColors[i % wordColors.length]} />
                    ))}
                  </Bar>
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
            Words like <em>film</em>, <em>movie</em>, <em>like</em>,{' '}
            <em>good</em> appear frequently. The presence of words like{' '}
            <em>good</em>, <em>great</em>, <em>bad</em> shows the direct link
            between the vocabulary used and the sentiment expressed. These words
            are strong indicators for the classification model.
            </div>
          </div>
        </div>
      )}

      {wordcloudPos && (
        <div
          ref={wcNegRef}
          className={`scroll-reveal scroll-reveal-delay-4 ${wcNegVis ? 'visible' : ''}`}
          style={{ marginTop: 20 }}
        >
          <div className="page-card">
            <h2 className="section-title">
              4. Word Cloud - Positive Reviews
            </h2>
            <p className="page-text" style={{ marginBottom: 16 }}>
              Word cloud generated from the first 10,000 positive reviews in the
              dataset. The most frequent words appear in larger
              size.
            </p>
            <div style={{ textAlign: 'center' }}>
              <img
                src={`data:image/png;base64,${wordcloudPos}`}
                alt="Word Cloud - Positive Reviews"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                }}
              />
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
            Dominant words in positive reviews include <em>good</em>,{' '}
            <em>great</em>, <em>best</em>, <em>love</em>, <em>excellent</em>.
            These terms are strongly correlated with positive sentiment and
            help the model identify favorable reviews.
            </div>
          </div>
        </div>
      )}

      {wordcloudNeg && (
        <div style={{ marginTop: 20, marginBottom: 40 }}>
          <div className="page-card">
            <h2 className="section-title">
              5. Word Cloud - Negative Reviews
            </h2>
            <p className="page-text" style={{ marginBottom: 16 }}>
              Word cloud generated from the first 10,000 negative reviews in the
              dataset. The most frequent words appear in larger
              size.
            </p>
            <div style={{ textAlign: 'center' }}>
              <img
                src={`data:image/png;base64,${wordcloudNeg}`}
                alt="Word Cloud - Negative Reviews"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                }}
              />
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
            In negative reviews, words like <em>bad</em>,{' '}
            <em>worst</em>, <em>boring</em>, <em>awful</em>, <em>terrible</em>{' '}
            are predominant. Comparing both word clouds shows a
            distinct vocabulary between the two classes, which confirms the
            relevance of the TF-IDF approach for capturing these differences.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EDA;