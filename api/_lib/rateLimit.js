// api/_lib/rateLimit.js — OWASP A07: Rate limiting
// Sliding window per-IP limiter using in-memory store.
// NOTE: For multi-instance Vercel deployments, replace with Vercel KV (Redis).

const store = new Map(); // ip → [timestamp, ...]

const WINDOW_MS  = 15 * 60 * 1000; // 15 minutes
const MAX_HITS   = 10;              // max login attempts per window

/**
 * Returns true if the IP is rate-limited (too many requests).
 */
export function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  let hits = store.get(ip) || [];
  // Prune old timestamps outside the current window
  hits = hits.filter(t => t > windowStart);

  if (hits.length >= MAX_HITS) return true;

  hits.push(now);
  store.set(ip, hits);
  return false;
}

/**
 * Remaining attempts for an IP.
 */
export function remainingAttempts(ip) {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const hits = (store.get(ip) || []).filter(t => t > windowStart);
  return Math.max(0, MAX_HITS - hits.length);
}
