// api/auth/register.js — POST /api/auth/register
import bcrypt from 'bcryptjs';
import { initDb, sql } from '../_lib/db.js';
import { ADMIN_EMAILS } from '../_lib/auth.js';
import { sanitizeStr } from '../_lib/sanitize.js';
import { isRateLimited } from '../_lib/rateLimit.js';
import { applySecurityHeaders, getClientIp } from '../_lib/headers.js';

const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/;
const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  applySecurityHeaders(res);

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const ip = getClientIp(req);
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Too many requests. Try again later.' });

  try {
    await initDb();

    const email    = sanitizeStr(req.body?.email    || '').toLowerCase();
    const password = sanitizeStr(req.body?.password || '');

    if (!EMAIL_RE.test(email))    return res.status(400).json({ error: 'Invalid email address.' });
    if (!PASSWORD_RE.test(password)) return res.status(400).json({ error: 'Password must be 12+ characters with letters, numbers, and symbols.' });

    const existing = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'customer';
    const hash = await bcrypt.hash(password, 12);
    
    await sql`
      INSERT INTO users (email, password_hash, role)
      VALUES (${email}, ${hash}, ${role})
    `;

    return res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error('[register]', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
