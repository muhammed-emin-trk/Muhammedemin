# Muhammed Emin Türkoğlu — Premium Kişisel Marka Sitesi

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion ile hazırlanmış, canlı animasyonlu, premium hisli kişisel marka sitesi.

## Özellikler
- Akıcı hero animasyonları (split-text reveal, mesh gradient arka plan, floating blob'lar)
- Animasyonlu sayaçlar, marquee, magnetic butonlar, scroll progress bar
- Bento skill grid, 3D-tilt servis kartları, akan testimonial carousel
- Karanlık/aydınlık tema desteği (system + manual)
- Tam responsive (mobil hamburger menü)
- Projeler ve blog için statik (SSG) detay sayfaları
- İletişim formu (toast + animasyonlu durum)
- Erişilebilir, `prefers-reduced-motion` saygılı, SEO için metadata template'leri

## Geliştirme

```bash
npm install
npm run dev   # http://localhost:5000
```

## Production Build

```bash
npm run build
npm run start
```

## Vercel'e Deploy

1. **GitHub'a push'la:**
   ```bash
   git add . && git commit -m "premium site"
   git push origin main
   ```
2. **Vercel'e gir:** [vercel.com/new](https://vercel.com/new) → "Add New Project" → GitHub repo'nu seç.
3. **Framework otomatik algılanır** ("Next.js"). Hiçbir özel ayar gerekmiyor.
4. **Environment Variables:** Boş bırak, sıfır değişken kullanılıyor.
5. **Deploy** butonuna bas. ~1 dakika sonra `https://muhammedemin.vercel.app` adresinde yayında.

> Önceki build hatası, kullanılmayan `prisma`, `next-auth`, `three.js`, `gsap`, `lenis` gibi ağır paketlerden ve eksik dosya referanslarından kaynaklanıyordu. Tüm kullanılmayan bağımlılıklar kaldırıldı, kod tek bir tutarlı tasarım sistemi etrafında temizlendi.

## Klasör Yapısı

```
app/
  (site)/
    page.tsx              # Anasayfa
    hakkimda/page.tsx
    projeler/page.tsx
    projeler/[slug]/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    iletisim/page.tsx
  layout.tsx
  globals.css
components/
  shared/   # navbar, footer, site-shell, reveal, magnetic, counter
  site/     # hero, stats, about, skills, services, process,
            # projects-preview, testimonials, marquee, blog-preview,
            # faq, contact-cta, contact-form
lib/
  content.ts # Projeler, blog yazıları, yorumlar, SSS, marka logoları
```

## Lisans
MIT
