// api/_lib/headers.js — OWASP A05: Security response headers

/**
 * Apply security headers to every API response.
 */
export function applySecurityHeaders(res) {
  // OWASP A02: force HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  // OWASP A05: prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // OWASP A05: block clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  // Privacy: no referrer leakage
  res.setHeader('Referrer-Policy', 'no-referrer');
  // Restrict browser features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Cache-Control for API responses
  res.setHeader('Cache-Control', 'no-store');
}

/**
 * Returns the caller's IP address from the request.
 */
export function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}
