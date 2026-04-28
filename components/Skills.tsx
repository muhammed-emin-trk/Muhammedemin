"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Sağlık",
    items: ["Hasta bakımı", "Klinik uygulamalar", "Ekip çalışması", "Kriz yönetimi"],
    gradient: "from-brand-blue/20 to-brand-green/20",
  },
  {
    title: "Teknoloji & Pazarlama",
    items: [
      "Web geliştirme (Next.js, React, Tailwind)",
      "SEO optimizasyonu",
      "Dijital pazarlama",
      "İçerik üretimi",
      "Sosyal medya yönetimi",
    ],
    gradient: "from-brand-purple/20 to-brand-indigo/20",
  },
];

export default function Skills() {
  return (
    <section id="yetenekler" className="py-20">
      <div className="section-container">
        <h3 className="text-2xl font-bold sm:text-3xl">Yetenekler & Uzmanlık Alanları</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
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
