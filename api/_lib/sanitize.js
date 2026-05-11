// api/_lib/sanitize.js — OWASP A03: Injection prevention
// Strips HTML tags, null bytes, and common injection patterns.

const HTML_TAG_RE   = /<[^>]*>/g;
const NULL_BYTE_RE  = /\x00/g;
const PROTO_RE      = /^(javascript|data|vbscript):/i;

/**
 * Sanitize a single string value.
 */
export function sanitizeStr(value, maxLen = 1000) {
  if (typeof value !== 'string') return '';
  return value
    .replace(NULL_BYTE_RE, '')   // null byte injection
    .replace(HTML_TAG_RE, '')    // strip HTML (XSS)
    .trim()
    .slice(0, maxLen);           // max length guard
}

/**
 * Sanitize a URL — only allow http/https.
 * Returns empty string for dangerous protocols.
 */
export function sanitizeUrl(value) {
  const s = sanitizeStr(value);
  if (PROTO_RE.test(s)) return '';
  // OWASP A10 SSRF: only allow known safe image hosts
  const SAFE_HOSTS = [
    'images.unsplash.com',
    'res.cloudinary.com',
    'upload.wikimedia.org',
    'cdn.pixabay.com',
    'images.pexels.com',
  ];
  try {
    const url = new URL(s);
    if (!SAFE_HOSTS.includes(url.hostname)) return '';
    return s;
  } catch {
    return '';
  }
}

/**
 * Sanitize a whole object's string fields.
 * Pass an object and a key→'str'|'url'|'num'|'long_str'|'json' schema.
 */
export function sanitizeBody(body, schema) {
  const out = {};
  for (const [key, type] of Object.entries(schema)) {
    if (type === 'str') out[key] = sanitizeStr(body[key]);
    else if (type === 'long_str') out[key] = sanitizeStr(body[key], 100000); // 100k for blog posts
    else if (type === 'url') out[key] = sanitizeUrl(body[key] || '');
    else if (type === 'num') out[key] = Number(body[key]) || 0;
    else if (type === 'json') {
      try {
        const val = body[key];
        // If it's already an object, stringify it to ensure it's clean then re-parse or just use it.
        // Actually, let's just ensure it's valid JSON.
        out[key] = typeof val === 'object' ? JSON.stringify(val) : JSON.stringify(JSON.parse(val || '{}'));
      } catch {
        out[key] = '{}';
      }
    }
  }
  return out;
}
