import { initDb, sql } from '../_lib/db.js';
import { sanitizeBody } from '../_lib/sanitize.js';
import { applySecurityHeaders } from '../_lib/headers.js';

export default async function handler(req, res) {
  applySecurityHeaders(res);
  await initDb();

  const { id } = req.query;
  const blogId = parseInt(id, 10);

  if (!blogId || isNaN(blogId)) {
    return res.status(400).json({ error: 'Invalid blog ID.' });
  }

  // ── DELETE: removes a blog (Now Public) ───────────────────────────────────
  if (req.method === 'DELETE') {
    const result = await sql`DELETE FROM blogs WHERE id = ${blogId} RETURNING id`;
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    return res.status(200).json({ message: 'Blog deleted successfully.' });
  }

  // ── PUT: updates a blog (Now Public) ──────────────────────────────────────
  if (req.method === 'PUT') {
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
        UPDATE blogs
        SET title = ${clean.title},
            slug = ${clean.slug},
            content = ${clean.content},
            category = ${clean.category},
            image_url = ${clean.image_url || null},
            summary_tldr = ${clean.summary_tldr || null},
            structured_data = ${clean.structured_data},
            citations = ${clean.citations}
        WHERE id = ${blogId}
        RETURNING *
      `;
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Blog not found.' });
      }
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      if (err.message.includes('unique constraint')) {
        return res.status(400).json({ error: 'A blog with this slug already exists.' });
      }
      return res.status(500).json({ error: 'Database error.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
