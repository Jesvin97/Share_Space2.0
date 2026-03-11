// api/_lib/db.js — Database layer using @vercel/postgres
// Handles schema init and all data access with parameterized queries (OWASP A03).
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

/**
 * Initialize tables and seed default data on first run.
 * Call this at the top of any API route that needs the DB.
 */
export async function initDb() {
  // Create users table
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id        SERIAL PRIMARY KEY,
      email     VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role      VARCHAR(50) NOT NULL DEFAULT 'user',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Create spaces table
  await sql`
    CREATE TABLE IF NOT EXISTS spaces (
      id       SERIAL PRIMARY KEY,
      name     VARCHAR(255) NOT NULL,
      location VARCHAR(100) NOT NULL,
      type     VARCHAR(100) NOT NULL,
      price    INTEGER NOT NULL CHECK (price >= 100),
      phone    VARCHAR(50) NOT NULL,
      img      TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Seed admin user if not exists
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@shrshape.com';
  const existing = await sql`SELECT id FROM users WHERE email = ${adminEmail} LIMIT 1`;
  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash('admin12345#@', 12);
    await sql`
      INSERT INTO users (email, password_hash, role)
      VALUES (${adminEmail}, ${hash}, 'admin')
    `;
  }

  // Seed default spaces if table is empty
  const spaceCount = await sql`SELECT COUNT(*) FROM spaces`;
  if (Number(spaceCount.rows[0].count) === 0) {
    const defaultSpaces = [
      { name: 'Sunset Loft Studio',        location: 'Bangalore', type: 'Studio',           price: 1500, phone: '+91 98765 00001', img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800' },
      { name: 'Heritage Courtyard',         location: 'Kerala',    type: 'Event Space',      price: 3000, phone: '+91 98765 00002', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' },
      { name: 'Industrial Warehouse',       location: 'Chennai',   type: 'Creative Content', price: 2000, phone: '+91 98765 00003', img: 'https://images.unsplash.com/photo-1574360773950-618e47bba097?auto=format&fit=crop&q=80&w=800' },
      { name: 'Banjara Hills Villa',        location: 'Hyderabad', type: 'Film Shoot',       price: 5000, phone: '+91 98765 00004', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
      { name: 'The Glasshouse',             location: 'Bangalore', type: 'Event Space',      price: 4000, phone: '+91 98765 00005', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800' },
      { name: 'Kochi Backwater Deck',       location: 'Kerala',    type: 'Creative Content', price: 2500, phone: '+91 98765 00006', img: 'https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&q=80&w=800' },
      { name: 'ECR Beachfront Setup',       location: 'Chennai',   type: 'Film Shoot',       price: 3500, phone: '+91 98765 00007', img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800' },
      { name: 'Jubilee Arts Center',        location: 'Hyderabad', type: 'Studio',           price: 1200, phone: '+91 98765 00008', img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800' },
      { name: 'Indiranagar Rooftop',        location: 'Bangalore', type: 'Event Space',      price: 1800, phone: '+91 98765 00009', img: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80&w=800' },
      { name: 'Munnar Tea Estate Bungalow', location: 'Kerala',    type: 'Film Shoot',       price: 6000, phone: '+91 98765 00010', img: 'https://images.unsplash.com/photo-1562237887-b67adcb82e4e?auto=format&fit=crop&q=80&w=800' },
    ];
    for (const s of defaultSpaces) {
      await sql`INSERT INTO spaces (name, location, type, price, phone, img) VALUES (${s.name}, ${s.location}, ${s.type}, ${s.price}, ${s.phone}, ${s.img})`;
    }
  }
}

export { sql };
