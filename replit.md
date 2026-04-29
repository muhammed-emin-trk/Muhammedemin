# Muhammed Emin Türkoğlu — Premium Kişisel Marka Sitesi

## Proje Özeti
Hemşire & yazılım geliştirici Muhammed Emin Türkoğlu için Next.js 14 + Tailwind tabanlı, premium hisli ve animasyonlu kişisel marka sitesi. Tek dilli (TR). Public site + tam donanımlı yönetim paneli.

## Teknoloji
- Next.js 14.2.25 (App Router) + TypeScript 5.7
- Tailwind CSS 3.4 (özel `brand` paleti: ivory, cream, sand, gold, bronze, copper, ink, charcoal, mist)
- Framer Motion 11 (reveal, marquee, scroll progress, magnetic, route transitions)
- next-themes (dark/light)
- lucide-react (ikonlar)
- next/font (Inter + Playfair Display)
- PostgreSQL (Replit Database) + raw `pg` Pool — **ORM YOK** (Drizzle yok, db:push gerekmez)

## Mimari
- `app/(site)/` — Tüm public sayfalar (anasayfa, hakkimda, projeler, blog, iletisim, sayfa/[slug]). Server component'ler DB'den okuyor.
- `app/admin/` — Yönetim paneli (mesajlar, projeler, blog, sayfalar, fotoğraflar, referanslar, sss, ayarlar).
- `app/api/` — Public `messages` POST + admin CRUD (login, logout, projects, posts, messages, pages, photos, testimonials, faqs, settings).
- `app/layout.tsx` — Sadece ThemeProvider.
- `app/(site)/layout.tsx` — `SiteShell` (navbar + footer + dinamik nav linkleri DB'den).
- `middleware.ts` — `/admin/*` HMAC cookie ile korunuyor (`/admin/login` hariç).
- `components/admin/` — `admin-shell` (renkli sidebar), `login-gate`.
- `components/shared/` — Genel etkileşim katmanı (navbar, footer, reveal, magnetic, counter, site-shell).
- `components/site/` — Sayfa blokları (hero, stats, about, skills, services, process, projects-preview, testimonials, marquee, blog-preview, faq, contact-cta, contact-form, personal-photos).
- `lib/db.ts` — pg Pool.
- `lib/admin-auth.ts` — HMAC cookie üret/doğrula (`SESSION_SECRET`).
- `lib/queries.ts` — Tüm DB getter'ları (typed, array normalizasyonu).

## Veritabanı (raw SQL)
Tablolar: `projects`, `posts`, `pages`, `messages`, `photos`, `testimonials`, `faqs`, `settings (key/value)`. Tümü `SERIAL` PK. Şema `executeSql` ile oluşturuldu, db:push KULLANMAYIN.

## Yönetim Paneli
- URL: `/admin/login`
- Şifre: `emin2026` (env: `ADMIN_PASSWORD`)
- Cookie: `met_admin` (HMAC, 30 gün)
- Renk paleti: amber/orange/rose/violet/emerald/sky gradientler.
- Tüm içerik (proje, blog, sayfa, fotoğraf, referans, SSS, iletişim ayarları) panelden eklenip silinebilir; gelen mesajlara cevap yazılabilir, okundu/yıldızlı işaretlenir.

## Workflow
- `Start application`: `npm run dev` (port 5000, host 0.0.0.0).

## Ortam Değişkenleri
- `DATABASE_URL` — PostgreSQL bağlantısı (Replit otomatik).
- `SESSION_SECRET` — HMAC için.
- `ADMIN_PASSWORD` — Yönetim paneli şifresi.

## Deploy Notları
- Vercel/Replit deployment için ortam değişkenleri ayarlanmalı.
- Production build temiz: `npm run build`.

## İçerik Düzenleme
- Artık tamamen yönetim panelinden (`/admin`).
- Hardcoded fallback değerler hâlâ `lib/content.ts` ve ilgili component'lerde (DB boşsa).
