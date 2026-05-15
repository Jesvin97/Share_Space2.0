import { initDb, sql } from '../_lib/db.js';
import { applySecurityHeaders } from '../_lib/headers.js';

export default async function handler(req, res) {
  applySecurityHeaders(res);
  await initDb();

  const { id } = req.query;
  const spaceId = parseInt(id, 10);

  if (!spaceId || isNaN(spaceId)) {
    return res.status(400).json({ error: 'Invalid space ID.' });
  }

  // ── GET: fetch single space ──────────────────────────────────────────────────
  if (req.method === 'GET') {
    const result = await sql`SELECT * FROM spaces WHERE id = ${spaceId}`;
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Space not found.' });
    }
    return res.status(200).json(result.rows[0]);
  }

  // ── DELETE: removes a listing (Now Public) ─────────────────────────────────────
  if (req.method === 'DELETE') {
    const result = await sql`DELETE FROM spaces WHERE id = ${spaceId} RETURNING id`;
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Space not found.' });
    }
    return res.status(200).json({ message: 'Space deleted successfully.' });
  }

  // ── PUT: updates a listing (Now Public) ─────────────────────────────────────────
  if (req.method === 'PUT') {
    const { sanitizeBody } = await import('../_lib/sanitize.js');
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

    const result = await sql`
      UPDATE spaces
      SET name = ${clean.name},
          location = ${clean.location},
          type = ${clean.type},
          price = ${clean.price},
          phone = ${clean.phone},
          img = ${clean.img || null}
      WHERE id = ${spaceId}
      RETURNING *
    `;
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Space not found.' });
    }
    return res.status(200).json(result.rows[0]);
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
