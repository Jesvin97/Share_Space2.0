// api/_lib/auth.js — Auth utility updated for NextAuth
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth].js";

/**
 * Master Admin Emails: Only these 3 emails have edit/modify/delete permissions.
 */
export const ADMIN_EMAILS = [
  'admin@shrshape.com',
  'jesvin@shrshape.com',
  'manager@shrshape.com'
];

/**
 * Middleware: require a valid NextAuth session.
 */
export function requireAuth(handler) {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    req.user = session.user;
    return handler(req, res);
  };
}

/**
 * Middleware: require a valid NextAuth session AND the admin role.
 */
export function requireAdmin(handler) {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }
    req.user = session.user;
    return handler(req, res);
  };
}
