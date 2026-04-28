"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Yazılım Geliştirme",
    items: ["Next.js & React", "TypeScript", "REST API entegrasyonları", "Component bazlı mimari"],
    gradient: "from-brand-blue/20 to-brand-green/20",
  },
  {
    title: "Performans & Güven",
    items: ["Core Web Vitals optimizasyonu", "Teknik SEO altyapısı", "Responsive ve erişilebilir UI", "Form ve veri güvenliği"],
    gradient: "from-brand-purple/20 to-brand-indigo/20",
  },
  {
    title: "İş Odaklı Yetkinlik",
    items: ["Dönüşüm odaklı landing page", "Kurumsal güven dili", "Hızlı teslim & revize", "Sürdürülebilir bakım"],
    gradient: "from-emerald-200/30 to-sky-300/30",
  },
];

export default function Skills() {
  return (
    <section id="yetenekler" className="py-20">
      <div className="section-container">
        <h3 className="text-2xl font-bold sm:text-3xl">Yetenekler & Uzmanlık Alanları</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card bg-gradient-to-br ${group.gradient}`}
            >
              <h4 className="text-xl font-semibold">{group.title}</h4>
              <ul className="mt-4 space-y-3 text-slate-700 dark:text-slate-200">
                {group.items.map((item) => (
                  <li key={item} className="rounded-lg border border-white/40 bg-white/40 px-3 py-2 dark:border-slate-700/40 dark:bg-slate-900/40">
                    {item}
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
