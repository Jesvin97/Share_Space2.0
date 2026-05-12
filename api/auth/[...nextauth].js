import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { initDb, sql } from "../_lib/db.js";
import { ADMIN_EMAILS } from "../_lib/auth.js";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await initDb();
        
        const email = credentials.email.toLowerCase();
        const result = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
        const user = result.rows[0];

        if (user && await bcrypt.compare(credentials.password, user.password_hash)) {
          // Check if user is in the master admin list
          const role = ADMIN_EMAILS.includes(user.email) ? 'admin' : (user.role || 'customer');
          
          return {
            id: user.id,
            email: user.email,
            role: role
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev-only",
};

export default (req, res) => NextAuth(req, res, authOptions);
