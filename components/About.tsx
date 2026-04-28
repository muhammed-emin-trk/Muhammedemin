"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    date: "2026",
    title: "Premium Marka Web Siteleri",
    description:
      "Kişisel marka, ajans ve KOBİ odaklı yüksek güven hissi veren web projeleri geliştiriyorum. Performans, dönüşüm ve tasarım dengesini birlikte kuruyorum.",
  },
  {
    date: "2024 - 2025",
    title: "Ölçeklenebilir Yazılım Altyapısı",
    description:
      "Next.js, React ve modern frontend mimarileri ile yönetilebilir, hızlı, SEO dostu ve bakım maliyeti düşük projeler teslim ettim.",
  },
  {
    date: "Sürekli",
    title: "Müşteri Güveni & İletişim",
    description:
      "Şeffaf süreç takibi, düzenli raporlama ve hızlı destek ile projelerde karşı tarafta güven ve memnuniyet oluşturan çalışma modeli uyguluyorum.",
  },
];

export default function About() {
  return (
    <section id="hakkimda" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
        >
          <h3 className="text-2xl font-bold sm:text-3xl">Hakkımda</h3>
          <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">
            Yazılım ve program geliştirme alanında, yalnızca “güzel görünen” değil aynı zamanda iş üreten ve güven veren
            dijital ürünler tasarlıyorum. Projelerde önceliğim; net hedef, doğru teknik mimari, kaliteli teslimat ve güçlü
            iletişim.
          </p>

          <div className="mt-8 grid gap-4">
            {timeline.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 dark:border-slate-700/50 dark:bg-slate-900/60"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-indigo">{item.date}</p>
                <h4 className="mt-2 text-lg font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
