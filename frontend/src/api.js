const API_BASE = (import.meta.env.VITE_API_BASE_URL || '') + '/api/v1/urls';

export async function shortenUrl(url) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed (${response.status})`);
  }

  return response.json();
}

export async function getAnalytics(shortCode) {
  const response = await fetch(`${API_BASE}/${shortCode}/analytics`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed (${response.status})`);
  }

  return response.json();
}
