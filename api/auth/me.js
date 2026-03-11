// api/auth/me.js — GET /api/auth/me
// Returns the current authenticated user from the cookie JWT, or 401.
import { getTokenFromRequest } from '../_lib/auth.js';
import { applySecurityHeaders } from '../_lib/headers.js';

export default function handler(req, res) {
  applySecurityHeaders(res);

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });

  const user = getTokenFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Not authenticated.' });

  // Return safe user info only — never return password or internal fields
  return res.status(200).json({ email: user.email, role: user.role });
}
