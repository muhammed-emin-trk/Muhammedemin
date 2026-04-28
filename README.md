# Muhammed Emin Türkoğlu - Premium Kişisel Marka Sitesi

Next.js 14 + TypeScript ile geliştirilmiş; site ve admin paneli içeren, Türkçe içerikli kişisel marka platformu.

## Kurulum

```bash
npm install
cp .env.example .env
npm run db:push
npm run dev
```

## Varsayılan admin girişi
- E-posta: `admin@meturkoglu.com`
- Şifre: `.env` içindeki `ADMIN_PASSWORD`

## Özellikler
- Anasayfa, Hakkımda, Projeler, Blog, İletişim sayfaları
- `/admin` panel iskeleti (projeler, blog, mesajlar, ayarlar)
- Prisma şeması + SQLite başlangıç
- NextAuth credentials tabanlı giriş altyapısı
