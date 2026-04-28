"use client";

import { motion } from "framer-motion";

const showcaseCards = [
  { title: "Kurumsal Landing", subtitle: "Yüksek güven hissi ve güçlü teklif butonlarıyla dönüşüm odaklı ana sayfa" },
  { title: "Hizmet Kataloğu", subtitle: "Ziyaretçinin hızlı karar vermesi için sade, anlaşılır ve premium hizmet modülleri" },
  { title: "Referans Blokları", subtitle: "Sosyal kanıt ve müşteri yorumlarıyla marka güvenini güçlendiren yapı" },
  { title: "Süreç Yönetimi Paneli", subtitle: "Müşteri tarafında şeffaf ilerleme takibi sağlayan proje aşama ekranları" },
  { title: "Mobil Öncelikli Tasarım", subtitle: "Telefon ekranlarında hızlı açılan, akıcı ve satış odaklı kullanıcı deneyimi" },
  { title: "Teklif Toplama Formu", subtitle: "Doğru sorularla kaliteli lead toplayan yapılandırılmış iletişim akışı" },
];

export default function Gallery() {
  return (
    <section id="galeri" className="py-20">
      <div className="section-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold sm:text-3xl">Vitrin / Örnek Çalışma Alanları</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Premium yazılım ve web projelerinde öne çıkan temel modül ve teslim başlıkları.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {showcaseCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group relative min-h-72 overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-slate-300/80 via-slate-200/75 to-slate-400/80 p-6 shadow-glass dark:from-slate-800 dark:via-slate-900 dark:to-slate-700"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.7),transparent_60%)] opacity-80 transition duration-300 group-hover:opacity-100" />
              <div className="relative mt-auto flex h-full flex-col justify-end rounded-2xl bg-black/30 p-4 text-white backdrop-blur-[2px]">
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">Showcase</p>
                <h4 className="mt-2 text-xl font-semibold">{card.title}</h4>
                <p className="mt-2 text-sm text-white/90">{card.subtitle}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
