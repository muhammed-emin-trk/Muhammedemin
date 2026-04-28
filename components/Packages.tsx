"use client";

import { motion } from "framer-motion";

const packages = [
  {
    name: "Starter",
    audience: "Yeni başlayan marka ve girişimler",
    features: ["Tek sayfa premium tasarım", "Temel SEO", "İletişim formu", "1 hafta destek"],
  },
  {
    name: "Business",
    audience: "Kurumsal büyüme hedefleyen işletmeler",
    features: ["Çok sayfalı kurumsal yapı", "Blog/İçerik yönetimi", "Hız optimizasyonu", "1 ay destek"],
    highlighted: true,
  },
  {
    name: "Scale",
    audience: "Yoğun trafik ve ileri entegrasyon ihtiyacı",
    features: ["Özel yazılım modülleri", "Otomasyon/entegrasyon", "A/B test altyapısı", "Sürekli bakım"],
  },
];

export default function Packages() {
  return (
    <section id="paketler" className="py-20">
      <div className="section-container">
        <h3 className="text-2xl font-bold sm:text-3xl">Paket Yaklaşımları</h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Net fiyatlandırma için ihtiyaca göre teklif hazırlanır.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {packages.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className={`glass-card ${item.highlighted ? "ring-2 ring-brand-indigo/60" : ""}`}
            >
              <h4 className="text-xl font-semibold">{item.name}</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.audience}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {item.features.map((feature) => (
                  <li key={feature} className="rounded-lg border border-slate-200/70 bg-white/60 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/60">
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
