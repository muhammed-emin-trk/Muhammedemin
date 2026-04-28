# Muhammed Emin Türkoğlu — Premium Kişisel Marka Platformu

## Kurulum
1. `npm install`
2. `.env.example` dosyasını `.env` olarak kopyalayın.
3. `npm run db:push`
4. `npm run db:seed`
5. `npm run dev`

## Admin Giriş
- URL: `/admin/login`
- E-posta/şifre: `.env` içindeki `ADMIN_EMAIL` ve `ADMIN_PASSWORD`

## Komutlar
- `npm run dev`: Geliştirme
- `npm run build`: Prod build
- `npm run lint`: ESLint
- `npm run db:push`: Prisma şema push
- `npm run db:seed`: Örnek veriler

## Klasör Yapısı
- `app/`: route ve layout yapısı
- `components/site`: public site bileşenleri
- `components/shared`: ortak UI ve davranış katmanları
- `prisma/`: schema ve seed

## Notlar
Bu repo koyu tema varsayılan, premium tasarım sistemi ve genişletilebilir admin modülleri hedefiyle düzenlenmiştir.
