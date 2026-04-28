import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@meturkoglu.com";
  const password = process.env.ADMIN_PASSWORD ?? "degistir-beni";
  const name = process.env.ADMIN_NAME ?? "Muhammed Emin Türkoğlu";

  await prisma.user.upsert({ where: { email }, update: {}, create: { email, name, password: await bcrypt.hash(password, 10) } });
  await prisma.service.createMany({ data: [
    { title: "Web Sitesi Tasarımı & Geliştirme", description: "Performans odaklı modern web deneyimleri.", icon: "Code2", order: 1 },
    { title: "Dijital Pazarlama & SEO", description: "Arama görünürlüğü ve dönüşüm odaklı içerik.", icon: "TrendingUp", order: 2 },
    { title: "Sağlık Sektörüne Özel Çözümler", description: "Sağlık profesyonelleri için dijital altyapı.", icon: "HeartPulse", order: 3 },
  ], skipDuplicates: true });
}

main().finally(() => prisma.$disconnect());
