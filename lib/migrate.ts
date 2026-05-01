import { query } from "./db";

let migrated = false;

export async function ensureTables() {
  if (migrated) return;
  migrated = true;
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        category TEXT DEFAULT '',
        year INT,
        role TEXT DEFAULT '',
        cover TEXT DEFAULT '',
        description TEXT DEFAULT '',
        content TEXT DEFAULT '[]',
        tags TEXT DEFAULT '',
        featured BOOLEAN DEFAULT false,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        excerpt TEXT DEFAULT '',
        cover TEXT DEFAULT '',
        date DATE DEFAULT NOW(),
        reading_minutes INT DEFAULT 5,
        body TEXT DEFAULT '[]',
        tags TEXT DEFAULT '',
        published BOOLEAN DEFAULT true,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL DEFAULT '',
        email TEXT NOT NULL DEFAULT '',
        subject TEXT DEFAULT '',
        message TEXT NOT NULL DEFAULT '',
        is_read BOOLEAN DEFAULT false,
        is_starred BOOLEAN DEFAULT false,
        reply TEXT DEFAULT '',
        replied_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT PRIMARY KEY DEFAULT 1,
        hero_badge TEXT DEFAULT '',
        hero_title TEXT DEFAULT 'Muhammed Emin Türkoğlu',
        hero_subtitle TEXT DEFAULT '',
        hero_description TEXT DEFAULT '',
        email TEXT DEFAULT '',
        phone TEXT DEFAULT '',
        whatsapp TEXT DEFAULT '',
        location TEXT DEFAULT '',
        github TEXT DEFAULT '',
        linkedin TEXT DEFAULT '',
        instagram TEXT DEFAULT '',
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await query(`INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING`);
    await query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL DEFAULT '',
        role TEXT DEFAULT '',
        avatar TEXT DEFAULT '',
        content TEXT DEFAULT '',
        rating INT DEFAULT 5,
        sort_order INT DEFAULT 0
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL DEFAULT '',
        answer TEXT DEFAULT '',
        sort_order INT DEFAULT 0
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS personal_photos (
        id SERIAL PRIMARY KEY,
        src TEXT NOT NULL,
        alt TEXT DEFAULT '',
        sort_order INT DEFAULT 0
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        subtitle TEXT DEFAULT '',
        cover TEXT DEFAULT '',
        body TEXT DEFAULT '[]',
        show_in_nav BOOLEAN DEFAULT false,
        published BOOLEAN DEFAULT true,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        path TEXT NOT NULL,
        referrer TEXT DEFAULT '',
        ua TEXT DEFAULT '',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await query(`CREATE INDEX IF NOT EXISTS page_views_path_idx ON page_views(path)`);
    await query(`CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views(created_at)`);
  } catch (e) {
    console.error("Migration error:", e);
  }
}
