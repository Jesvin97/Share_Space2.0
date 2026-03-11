// api/auth/logout.js — POST /api/auth/logout
// Clears the session cookie by setting Max-Age=0.
import { applySecurityHeaders } from '../_lib/headers.js';

export default function handler(req, res) {
  applySecurityHeaders(res);

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  // Expire the cookie immediately
  res.setHeader('Set-Cookie',
    '__Host-session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'
  );

  return res.status(200).json({ message: 'Logged out successfully.' });
}
