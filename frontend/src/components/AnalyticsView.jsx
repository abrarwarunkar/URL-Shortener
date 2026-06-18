import { useState } from 'react';
import { getAnalytics } from '../api.js';

function AnalyticsView() {
  const [shortCode, setShortCode] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setData(null);

    const trimmed = shortCode.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      const result = await getAnalytics(trimmed);
      setData(result);
    } catch (err) {
      setError(err.message || 'Could not fetch analytics. Check the short code.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const parseUserAgent = (ua) => {
    if (!ua) return 'Unknown';
    if (ua.length > 60) return ua.substring(0, 57) + '...';
    return ua;
  };

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Real-time Tracking
        </div>
        <h1>
          Link <span className="gradient-text">Analytics</span>
        </h1>
        <p className="hero-subtitle">
          Monitor click activity, visitor IPs, and user agents
          for any of your shortened URLs.
        </p>
      </section>

      {/* Search Form */}
      <div className="glass-card">
        <form className="analytics-form" onSubmit={handleSubmit} id="analytics-form">
          <div className="input-wrapper">
            <input
              id="analytics-input"
              type="text"
              className="url-input"
              placeholder="Enter short code (e.g. 4sR3kz)"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              required
              autoComplete="off"
              autoFocus
            />
            <span className="input-icon" aria-hidden="true">🔍</span>
          </div>
          <button
            id="analytics-btn"
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            <span>{loading ? <span className="spinner"></span> : 'Lookup'}</span>
          </button>
        </form>

        {error && (
          <div className="error-banner" role="alert">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
      </div>

      {/* Analytics Results */}
      {data && (
        <>
          {/* Stats Grid */}
          <div className="analytics-stats" style={{ marginTop: '24px' }}>
            <div className="stat-card">
              <div className="stat-value" id="total-clicks">{data.totalClicks}</div>
              <div className="stat-label">Total Clicks</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.shortCode}</div>
              <div className="stat-label">Short Code</div>
            </div>
            <div className="stat-card" style={{ gridColumn: '1 / -1' }}>
              <div className="stat-value" style={{ fontSize: '16px', fontWeight: 600 }}>
                {data.originalUrl}
              </div>
              <div className="stat-label">Original URL</div>
            </div>
          </div>

          {/* Clicks Table */}
          <div className="glass-card clicks-section">
            <div className="clicks-header">
              <h2 className="clicks-title">Recent Clicks</h2>
              <span className="clicks-count">
                {data.recentClicks?.length || 0} shown
              </span>
            </div>

            {data.recentClicks && data.recentClicks.length > 0 ? (
              <div className="clicks-table-wrapper">
                <table className="clicks-table" id="clicks-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>IP Address</th>
                      <th>User Agent</th>
                      <th>Clicked At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentClicks.map((click, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="ip-cell">{click.ipAddress}</td>
                        <td className="ua-cell" title={click.userAgent}>
                          {parseUserAgent(click.userAgent)}
                        </td>
                        <td className="time-cell">{formatDate(click.clickedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <div className="empty-text">No clicks recorded yet</div>
                <div className="empty-subtext">
                  Share your short URL and check back for analytics
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {!data && !error && !loading && (
        <div className="glass-card" style={{ marginTop: '24px' }}>
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <div className="empty-text">Enter a short code to view analytics</div>
            <div className="empty-subtext">
              You'll see total clicks, visitor details, and timestamps
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnalyticsView;
