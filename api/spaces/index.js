// api/spaces/index.js
// GET  /api/spaces — public, returns all spaces
// POST /api/spaces — admin only, add a new space
import { initDb, sql } from '../_lib/db.js';
import { requireAdmin } from '../_lib/auth.js';
import { sanitizeBody } from '../_lib/sanitize.js';
import { applySecurityHeaders } from '../_lib/headers.js';

async function handler(req, res) {
  applySecurityHeaders(res);
  await initDb();

  // ── GET: public listing ──────────────────────────────────────────────────
  if (req.method === 'GET') {
    const result = await sql`SELECT * FROM spaces ORDER BY created_at DESC`;
    return res.status(200).json(result.rows);
  }

  // ── POST: admin creates a listing ────────────────────────────────────────
  if (req.method === 'POST') {
    // requireAdmin is applied as HOF below
    const clean = sanitizeBody(req.body, {
      name:     'str',
      location: 'str',
      type:     'str',
      price:    'num',
      phone:    'str',
      img:      'url',
    });

    if (!clean.name || !clean.location || !clean.type || !clean.phone) {
      return res.status(400).json({ error: 'Name, location, type, and phone are required.' });
    }
    if (clean.price < 100) {
      return res.status(400).json({ error: 'Price must be at least ₹100/hr.' });
    }

    const result = await sql`
      INSERT INTO spaces (name, location, type, price, phone, img)
      VALUES (${clean.name}, ${clean.location}, ${clean.type}, ${clean.price}, ${clean.phone}, ${clean.img || null})
      RETURNING *
    `;
    return res.status(201).json(result.rows[0]);
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}

// Wrap POST in requireAdmin — GET is already public (no wrapper needed at route level)
// We conditionally apply admin check inside the handler itself.
export default async function secureHandler(req, res) {
  if (req.method === 'POST') {
    return requireAdmin(handler)(req, res);
  }
  return handler(req, res);
}
