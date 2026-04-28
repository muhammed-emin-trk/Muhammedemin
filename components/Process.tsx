"use client";

import { motion } from "framer-motion";

const steps = [
  { title: "1) Keşif Toplantısı", text: "Hedef kitle, rakip analizi, beklenti ve teslim kapsamı netleştirilir." },
  { title: "2) UX/UI Planlama", text: "Sayfa mimarisi, içerik akışı ve dönüşüm noktaları prototiplenir." },
  { title: "3) Geliştirme", text: "Modern teknolojiyle hızlı, güvenli ve ölçeklenebilir yazılım geliştirilir." },
  { title: "4) Test & Yayına Alma", text: "Cihaz uyumluluğu, performans ve kalite kontrollerinden sonra canlıya alınır." },
  { title: "5) Destek", text: "Yayın sonrası güncelleme, iyileştirme ve teknik destek süreci devam eder." },
];

export default function Process() {
  return (
    <section id="surec" className="py-20">
      <div className="section-container">
        <h3 className="text-2xl font-bold sm:text-3xl">Çalışma Süreci</h3>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="glass-card"
            >
              <h4 className="text-sm font-semibold text-brand-indigo">{step.title}</h4>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
