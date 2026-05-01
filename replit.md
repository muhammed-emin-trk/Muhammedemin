# Muhammed Emin Türkoğlu — Premium Kişisel Marka Sitesi

## Proje Özeti
Hemşire & yazılım geliştirici Muhammed Emin Türkoğlu için Next.js 14 + Tailwind tabanlı, premium hisli ve animasyonlu kişisel marka sitesi. Tek dilli (TR). Public site + tam donanımlı yönetim paneli.

## Teknoloji
- Next.js 14.2.25 (App Router) + TypeScript 5.7
- Tailwind CSS 3.4 (özel `brand` paleti: ivory, cream, sand, gold, bronze, copper, ink, charcoal, mist)
- Framer Motion 11 (reveal, marquee, scroll progress, magnetic, route transitions)
- next-themes (dark/light)
- lucide-react (ikonlar)
- next/font (Inter + Playfair Display — Google Fonts optimize edilmiş)
- PostgreSQL + raw `pg` Pool — **ORM YOK**

## Mimari
- `app/(site)/` — Tüm public sayfalar (anasayfa, hakkimda, projeler, blog, iletisim, sayfa/[slug]). Server component'ler DB'den okuyor.
- `app/admin/` — Yönetim paneli (mesajlar, projeler, blog, sayfalar, fotoğraflar, referanslar, sss, ayarlar).
- `app/api/` — Public `messages` POST + admin CRUD (login, logout, projects, posts, messages, pages, photos, testimonials, faqs, settings).
- `app/api/admin/setup-db/` — Tüm DB tablolarını oluşturan route (GET ile tetiklenir).
- `app/layout.tsx` — Inter + Playfair Display fontları + ThemeProvider.
- `app/(site)/layout.tsx` — `SiteShell` (navbar + footer + dinamik nav linkleri DB'den).
- `middleware.ts` — `/admin/*` HMAC cookie ile korunuyor (`/admin/login` hariç).
- `components/admin/` — `admin-shell` (renkli sidebar), `login-gate`.
- `components/shared/` — Genel etkileşim katmanı (navbar, footer, reveal, magnetic, counter, site-shell).
- `components/site/` — Sayfa blokları (hero, stats, about, skills, services, process, projects-preview, testimonials, marquee, blog-preview, faq, contact-cta, contact-form, personal-photos).
- `lib/db.ts` — pg Pool (eval+require ile Edge dışı Node.js ortamı).
- `lib/migrate.ts` — Otomatik DB migrasyonu (queries.ts import edildiğinde çalışır).
- `lib/admin-auth.ts` — HMAC cookie üret/doğrula (`SESSION_SECRET`).
- `lib/queries.ts` — Tüm DB getter'ları (typed, array normalizasyonu, `ensureTables()` çağırır).

## Veritabanı (raw SQL)
Tablolar: `projects`, `posts`, `pages`, `messages`, `personal_photos`, `testimonials`, `faqs`, `site_settings`.
- Şema otomatik olarak `lib/migrate.ts` aracılığıyla oluşturulur (ilk istek üzerine).
- Ayrıca `GET /api/admin/setup-db` endpoint'i de tablolar oluşturabilir.
- db:push KULLANMAYIN.

## Yönetim Paneli
- URL: `/admin/login`
- Şifre: `emin2026` (env: `ADMIN_PASSWORD`)
- Cookie: `met_admin` (HMAC, 30 gün)
- Renk paleti: amber/orange/rose/violet/emerald/sky gradientler.
- Tüm içerik (proje, blog, sayfa, fotoğraf, referans, SSS, iletişim ayarları) panelden eklenip silinebilir.

## Workflow
- `Start application`: `npm run dev` (port 5000, host 0.0.0.0).

## Ortam Değişkenleri
- `DATABASE_URL` — PostgreSQL bağlantısı.
- `SESSION_SECRET` — HMAC için.
- `ADMIN_PASSWORD` — Yönetim paneli şifresi (mevcut: `emin2026`).

## Deploy Notları
- Vercel deployment için ortam değişkenlerini Vercel'de ayarla.
- İlk deploy sonrası `/api/admin/setup-db` endpoint'ini bir kez GET ile çağır (tablolar oluşturulacak).
- Veya ilk API isteğinde `lib/migrate.ts` otomatik çalışır.
- Production build temiz: `npm run build`.

## Tasarım İyileştirmeleri (Son)
- Hero: Daha canlı çok katmanlı gradient, floating chips animasyonlu, role badge AnimatePresence ile.
- Stats: Renk kodlu icon + accent bar, hover lift efektleri.
- Skills: Framer Motion hover + renkli accent barlar.
- Marquee: Fade-out kenarlar, daha hızlı akış.
- Contact CTA: Üç animasyonlu blob, dot pattern overlay.
- globals.css: Daha güçlü glass-card hover, btn-ghost aktif state, yeni utility sınıflar.
- tailwind.config.ts: Yeni animasyonlar (fade-up, scale-in, float-slow, pulse-glow).
- Fonts: next/font/google ile optimize Inter + Playfair Display.
