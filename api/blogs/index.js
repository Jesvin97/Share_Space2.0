// api/blogs/index.js
// GET  /api/blogs — public, returns all blogs
// POST /api/blogs — admin only, add a new blog
import { initDb, sql } from '../_lib/db.js';
import { requireAdmin } from '../_lib/auth.js';
import { sanitizeBody } from '../_lib/sanitize.js';
import { applySecurityHeaders } from '../_lib/headers.js';

async function handler(req, res) {
  applySecurityHeaders(res);
  await initDb();

  // ── GET: public listing ──────────────────────────────────────────────────
  if (req.method === 'GET') {
    const result = await sql`SELECT * FROM blogs ORDER BY created_at DESC`;
    return res.status(200).json(result.rows);
  }

  // ── POST: admin creates a blog ───────────────────────────────────────────
  if (req.method === 'POST') {
    const clean = sanitizeBody(req.body, {
      title:          'str',
      slug:           'str',
      content:        'long_str',
      category:       'str',
      image_url:      'url',
      summary_tldr:   'str',
      structured_data: 'json',
      citations:      'json',
    });

    if (!clean.title || !clean.slug || !clean.content || !clean.category) {
      return res.status(400).json({ error: 'Title, slug, content, and category are required.' });
    }

    try {
      const result = await sql`
        INSERT INTO blogs (title, slug, content, category, image_url, summary_tldr, structured_data, citations)
        VALUES (${clean.title}, ${clean.slug}, ${clean.content}, ${clean.category}, ${clean.image_url || null}, ${clean.summary_tldr || null}, ${clean.structured_data}, ${clean.citations})
        RETURNING *
      `;
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      if (err.message.includes('unique constraint')) {
        return res.status(400).json({ error: 'A blog with this slug already exists.' });
      }
      return res.status(500).json({ error: 'Database error.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}

export default async function secureHandler(req, res) {
  if (req.method === 'POST') {
    return requireAdmin(handler)(req, res);
  }
  return handler(req, res);
}
