// api/_lib/auth.js — JWT sign/verify helpers
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;
if (!SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is not set!');
}

const FALLBACK_SECRET = SECRET || 'dev-secret-change-in-production-min-64-chars!!';

/**
 * Sign a JWT payload. Token expires in 24 hours.
 */
export function signToken(payload) {
  return jwt.sign(payload, FALLBACK_SECRET, {
    algorithm: 'HS256',
    expiresIn: '24h',
    issuer: 'sparespace',
    audience: 'sparespace-client',
  });
}

/**
 * Verify a JWT. Returns decoded payload or throws.
 */
export function verifyToken(token) {
  return jwt.verify(token, FALLBACK_SECRET, {
    algorithms: ['HS256'],
    issuer: 'sparespace',
    audience: 'sparespace-client',
  });
}

/**
 * Extract JWT from the __Host-session cookie in a request.
 * Returns null if not present or invalid.
 */
export function getTokenFromRequest(req) {
  const rawCookie = req.headers.cookie || '';
  const match = rawCookie.match(/(?:^|;\s*)__Host-session=([^;]+)/);
  if (!match) return null;
  try {
    return verifyToken(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

/**
 * Middleware: require a valid JWT. Sets req.user or returns 401.
 */
export function requireAuth(handler) {
  return async (req, res) => {
    const user = getTokenFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    req.user = user;
    return handler(req, res);
  };
}

/**
 * Middleware: require a valid JWT AND the admin role.
 */
export function requireAdmin(handler) {
  return async (req, res) => {
    const user = getTokenFromRequest(req);
    if (!user) return res.status(401).json({ error: 'Authentication required.' });
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' });
    req.user = user;
    return handler(req, res);
  };
}
