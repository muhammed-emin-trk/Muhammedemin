import { query, queryOne } from "./db";
import { ensureTables } from "./migrate";

const _init = ensureTables();

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  year: number | null;
  role: string | null;
  cover: string | null;
  description: string | null;
  content: string[];
  tags: string[];
  featured: boolean;
  sort_order: number;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover: string | null;
  date: string;
  reading_minutes: number;
  body: string[];
  tags: string[];
  published: boolean;
  sort_order: number;
};

export type Message = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  is_starred: boolean;
  reply: string | null;
  replied_at: string | null;
  created_at: string;
};

export type Page = {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  cover: string | null;
  body: string[];
  show_in_nav: boolean;
  published: boolean;
  sort_order: number;
};

export type Settings = {
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  github: string;
  linkedin: string;
  instagram: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  avatar: string | null;
  content: string | null;
  rating: number;
  sort_order: number;
};

export type Faq = { id: number; question: string; answer: string | null; sort_order: number };
export type Photo = { id: number; src: string; alt: string | null; sort_order: number };

const tryParseArr = (v: any): string[] => {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    try {
      const j = JSON.parse(v);
      if (Array.isArray(j)) return j;
      return v.split(",").map((s: string) => s.trim()).filter(Boolean);
    } catch {
      return v.split(",").map((s: string) => s.trim()).filter(Boolean);
    }
  }
  return [];
};

const mapProject = (r: any): Project => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  category: r.category,
  year: r.year,
  role: r.role,
  cover: r.cover,
  description: r.description,
  content: tryParseArr(r.content),
  tags: tryParseArr(r.tags),
  featured: !!r.featured,
  sort_order: r.sort_order,
});

const mapPost = (r: any): Post => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  excerpt: r.excerpt,
  cover: r.cover,
  date: r.date instanceof Date ? r.date.toISOString().slice(0, 10) : String(r.date),
  reading_minutes: r.reading_minutes,
  body: tryParseArr(r.body),
  tags: tryParseArr(r.tags),
  published: !!r.published,
  sort_order: r.sort_order,
});

const mapPage = (r: any): Page => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  subtitle: r.subtitle,
  cover: r.cover,
  body: tryParseArr(r.body),
  show_in_nav: !!r.show_in_nav,
  published: !!r.published,
  sort_order: r.sort_order,
});

export async function getProjects(): Promise<Project[]> {
  const rows = await query("SELECT * FROM projects ORDER BY sort_order ASC, id ASC");
  return rows.map(mapProject);
}
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const r = await queryOne("SELECT * FROM projects WHERE slug=$1", [slug]);
  return r ? mapProject(r) : null;
}
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const rows = await query(
    "SELECT * FROM projects WHERE featured=true ORDER BY sort_order ASC LIMIT $1",
    [limit]
  );
  return rows.map(mapProject);
}

export async function getPosts(): Promise<Post[]> {
  const rows = await query("SELECT * FROM posts WHERE published=true ORDER BY sort_order ASC, id ASC");
  return rows.map(mapPost);
}
export async function getAllPostsAdmin(): Promise<Post[]> {
  const rows = await query("SELECT * FROM posts ORDER BY sort_order ASC, id ASC");
  return rows.map(mapPost);
}
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const r = await queryOne("SELECT * FROM posts WHERE slug=$1", [slug]);
  return r ? mapPost(r) : null;
}

export async function getMessages(): Promise<Message[]> {
  return await query<Message>("SELECT * FROM messages ORDER BY created_at DESC");
}
export async function getMessageStats() {
  const r = await queryOne<any>(
    "SELECT count(*)::int total, count(*) FILTER (WHERE is_read=false)::int unread FROM messages"
  );
  return { total: r?.total ?? 0, unread: r?.unread ?? 0 };
}

export async function getPages(): Promise<Page[]> {
  const rows = await query("SELECT * FROM pages WHERE published=true ORDER BY sort_order ASC, id ASC");
  return rows.map(mapPage);
}
export async function getAllPagesAdmin(): Promise<Page[]> {
  const rows = await query("SELECT * FROM pages ORDER BY sort_order ASC, id ASC");
  return rows.map(mapPage);
}
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const r = await queryOne("SELECT * FROM pages WHERE slug=$1 AND published=true", [slug]);
  return r ? mapPage(r) : null;
}
export async function getNavPages(): Promise<Page[]> {
  const rows = await query(
    "SELECT * FROM pages WHERE show_in_nav=true AND published=true ORDER BY sort_order ASC"
  );
  return rows.map(mapPage);
}

export async function getSettings(): Promise<Settings> {
  const r = await queryOne<any>("SELECT * FROM site_settings WHERE id=1");
  return {
    hero_badge: r?.hero_badge ?? "",
    hero_title: r?.hero_title ?? "Muhammed Emin Türkoğlu",
    hero_subtitle: r?.hero_subtitle ?? "",
    hero_description: r?.hero_description ?? "",
    email: r?.email ?? "",
    phone: r?.phone ?? "",
    whatsapp: r?.whatsapp ?? "",
    location: r?.location ?? "",
    github: r?.github ?? "",
    linkedin: r?.linkedin ?? "",
    instagram: r?.instagram ?? "",
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return await query<Testimonial>("SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC");
}
export async function getFaqs(): Promise<Faq[]> {
  return await query<Faq>("SELECT * FROM faqs ORDER BY sort_order ASC, id ASC");
}
export async function getPhotos(): Promise<Photo[]> {
  return await query<Photo>("SELECT * FROM personal_photos ORDER BY sort_order ASC, id ASC");
}
