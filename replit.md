# Muhammed Emin Türkoğlu — Premium Kişisel Marka Sitesi

## Proje Özeti
Hemşire & yazılım geliştirici Muhammed Emin Türkoğlu için Next.js 14 + Tailwind tabanlı, premium hisli ve animasyonlu kişisel marka sitesi. Tek dilli (TR), tamamen statik (SSG), backend yok.

## Teknoloji
- Next.js 14.2.25 (App Router) + TypeScript 5.7
- Tailwind CSS 3.4 (özel `brand` paleti: ivory, cream, sand, gold, bronze, copper, ink, charcoal, mist)
- Framer Motion 11 (reveal, marquee, scroll progress, magnetic, route transitions)
- next-themes (dark/light)
- lucide-react (ikonlar)
- next/font (Inter + Playfair Display)

## Mimari
- `app/(site)/` — Tüm public sayfalar (anasayfa, hakkimda, projeler, blog, iletisim).
- `app/layout.tsx` — `SiteShell` ile shared navbar/footer + ambient blob arka plan + scroll progress + grain noise overlay.
- `components/shared/` — Genel etkileşim katmanı (navbar, footer, reveal, magnetic, counter, site-shell).
- `components/site/` — Sayfa blokları (hero, stats, about, skills, services, process, projects-preview, testimonials, marquee, blog-preview, faq, contact-cta, contact-form).
- `lib/content.ts` — Statik içerik (projeler, blog yazıları, yorumlar, SSS, marka logoları). DB yok.

## Workflow
- `Start application`: `npm run dev` (port 5000, host 0.0.0.0).

## Deploy Notları
- Vercel için ekstra config gerekmiyor; framework otomatik algılanır.
- Production build temiz: `npm run build` 17 statik sayfa üretir.
- Önceden vardı ama kaldırılan ağır paketler: prisma, next-auth, three, @react-three/fiber, gsap, lenis, sonner, zod, react-hook-form, bcryptjs (build hatasına yol açıyorlardı). Tek bir tutarlı tasarım sistemi etrafında sadeleştirildi.

## İçerik Düzenleme
- Projeler/blog/yorumlar/SSS/marka logoları → `lib/content.ts` içinden düzenlenir.
- Sayaçlar → `components/site/stats.tsx`.
- Hero başlığı → `components/site/hero.tsx`.

## Geleceğe Dönük Notlar
- Admin paneli istenirse Prisma + NextAuth ile geri eklenebilir.
- Çok dilli (TR/EN) destek için `next-intl` entegre edilebilir.
- Online randevu modülü Cal.com embed ile kolayca eklenebilir.
