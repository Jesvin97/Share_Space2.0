// api/spaces/[id].js — DELETE /api/spaces/:id (admin only)
import { initDb, sql } from '../_lib/db.js';
import { requireAdmin } from '../_lib/auth.js';
import { applySecurityHeaders } from '../_lib/headers.js';

async function handler(req, res) {
  applySecurityHeaders(res);

  const { id } = req.query;
  const spaceId = parseInt(id, 10);

  if (!spaceId || isNaN(spaceId)) {
    return res.status(400).json({ error: 'Invalid space ID.' });
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  await initDb();

  const result = await sql`DELETE FROM spaces WHERE id = ${spaceId} RETURNING id`;
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Space not found.' });
  }

  return res.status(200).json({ message: 'Space deleted successfully.' });
}

// Require admin JWT for all operations on this route
export default requireAdmin(handler);
