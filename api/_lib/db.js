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

  // Create blogs table (AEO/GEO Enhanced)
  await sql`
    CREATE TABLE IF NOT EXISTS blogs (
      id             SERIAL PRIMARY KEY,
      title          VARCHAR(255) NOT NULL,
      slug           VARCHAR(255) UNIQUE NOT NULL,
      content        TEXT NOT NULL,
      category       VARCHAR(50) NOT NULL, -- SEO, AEO, LLMSEO, GEO
      image_url      TEXT,
      summary_tldr   TEXT,
      structured_data JSONB,
      citations      JSONB,
      created_at     TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Seed admin user if not exists
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@shrshape.com';
  const adminPass  = process.env.ADMIN_PASSWORD || 'admin12345#@';
  const existing = await sql`SELECT id FROM users WHERE email = ${adminEmail} LIMIT 1`;
  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash(adminPass, 12);
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

  // Seed default blogs if table is empty
  const blogCount = await sql`SELECT COUNT(*) FROM blogs`;
  if (Number(blogCount.rows[0].count) === 0) {
    const defaultBlogs = [
      {
        title: 'Mastering AEO: The Future of Answer Engines',
        slug: 'mastering-aeo',
        category: 'AEO',
        content: 'Answer Engine Optimization is the next frontier of search...',
        summary_tldr: 'AEO focuses on providing direct answers to user queries on platforms like Perplexity and ChatGPT.',
        structured_data: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "headline": "Mastering AEO" }),
        citations: JSON.stringify([{ "name": "Google Developers", "url": "https://developers.google.com/search/docs" }]),
        image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'GEO: Optimizing for Generative Search',
        slug: 'geo-optimization',
        category: 'GEO',
        content: 'Generative Engine Optimization (GEO) is about making your content the primary source for AI models...',
        summary_tldr: 'GEO ensures your content is authoritative and structured for easy parsing by generative AI.',
        structured_data: JSON.stringify({ "@context": "https://schema.org", "@type": "TechArticle", "name": "GEO Optimization" }),
        citations: JSON.stringify([{ "name": "Search Engine Journal", "url": "https://www.searchenginejournal.com" }]),
        image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
      }
    ];
    for (const b of defaultBlogs) {
      await sql`
        INSERT INTO blogs (title, slug, category, content, summary_tldr, structured_data, citations, image_url)
        VALUES (${b.title}, ${b.slug}, ${b.category}, ${b.content}, ${b.summary_tldr}, ${b.structured_data}, ${b.citations}, ${b.image_url})
      `;
    }
  }
}

export { sql };
