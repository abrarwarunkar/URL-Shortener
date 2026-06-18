import { useState } from 'react';

function ResultCard({ data }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = data.shortUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="result-card" id="result-card">
      <div className="result-label">Your shortened URL</div>
      <div className="result-url-row">
        <span className="result-short-url" id="short-url-display">
          {data.shortUrl}
        </span>
        <button
          id="copy-btn"
          className={`copy-btn${copied ? ' copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <div className="result-original">
        Original: {data.originalUrl}
      </div>
      <div className="result-meta">
        <div className="result-meta-item">
          <span className="result-meta-icon">🏷️</span>
          Code: <strong>{data.shortCode}</strong>
        </div>
        <div className="result-meta-item">
          <span className="result-meta-icon">📅</span>
          {formatDate(data.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
