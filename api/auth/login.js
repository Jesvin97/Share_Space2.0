// api/auth/login.js — POST /api/auth/login
// OWASP: A07 (rate limiting), A02 (bcrypt), A04 (httpOnly cookie)
import bcrypt from 'bcryptjs';
import { initDb, sql } from '../_lib/db.js';
import { signToken } from '../_lib/auth.js';
import { sanitizeStr } from '../_lib/sanitize.js';
import { isRateLimited, remainingAttempts } from '../_lib/rateLimit.js';
import { applySecurityHeaders, getClientIp } from '../_lib/headers.js';

export default async function handler(req, res) {
  applySecurityHeaders(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Rate limiting per IP
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many login attempts. Please wait 15 minutes.',
    });
  }

  try {
    await initDb();

    const email    = sanitizeStr(req.body?.email    || '').toLowerCase();
    const password = sanitizeStr(req.body?.password || '');

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Fetch user — parameterized query prevents SQL injection
    const result = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
    const user   = result.rows[0];

    // OWASP A07: use constant-time compare; return generic error (no user enumeration)
    const validPassword = user
      ? await bcrypt.compare(password, user.password_hash)
      : await bcrypt.compare(password, '$2b$12$invalidhashusedtoconsistenttiming00000000000000000000');

    if (!user || !validPassword) {
      return res.status(401).json({
        error: 'Invalid credentials.',
        remaining: remainingAttempts(ip),
      });
    }

    // Sign JWT
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    // Set httpOnly, Secure, SameSite cookie — JS cannot access this
    res.setHeader('Set-Cookie',
      `__Host-session=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400`
    );

    return res.status(200).json({ email: user.email, role: user.role });
  } catch (err) {
    console.error('[login]', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
