import { useState } from 'react';
import { shortenUrl } from '../api.js';
import ResultCard from './ResultCard.jsx';

function ShortenView() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const trimmed = url.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      const data = await shortenUrl(trimmed);
      setResult(data);
      setUrl('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Production Ready
        </div>
        <h1>
          Shorten Your Links,<br />
          <span className="gradient-text">Amplify Your Reach</span>
        </h1>
        <p className="hero-subtitle">
          Transform lengthy URLs into clean, trackable short links.
          Powered by Redis caching for sub-millisecond redirects.
        </p>
      </section>

      {/* Shorten Form */}
      <div className="glass-card">
        <form className="url-form" onSubmit={handleSubmit} id="shorten-form">
          <div className="input-wrapper">
            <input
              id="url-input"
              type="url"
              className="url-input"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              autoComplete="off"
              autoFocus
            />
            <span className="input-icon" aria-hidden="true">🔗</span>
          </div>
          <button
            id="shorten-btn"
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            <span>{loading ? <span className="spinner"></span> : 'Shorten'}</span>
          </button>
        </form>

        {error && (
          <div className="error-banner" role="alert">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {result && <ResultCard data={result} />}
      </div>
    </>
  );
}

export default ShortenView;
