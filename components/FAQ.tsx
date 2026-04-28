"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "Bir proje ortalama ne kadar sürer?",
    a: "Kapsama göre 1-6 hafta aralığında teslim edilir. Zaman planı başlangıçta netleştirilir.",
  },
  {
    q: "Site tamamlandıktan sonra destek veriyor musunuz?",
    a: "Evet, talebe göre bakım ve geliştirme desteği sağlanır.",
  },
  {
    q: "SEO ve hız optimizasyonu dahil mi?",
    a: "Evet. Teknik SEO ve performans optimizasyonu standart teslimat yaklaşımının bir parçasıdır.",
  },
  {
    q: "İçerik ve metinleri siz hazırlıyor musunuz?",
    a: "İsterseniz marka tonunuza uygun içerik kurgusu ve dönüşüm odaklı metin desteği de sunulur.",
  },
];

export default function FAQ() {
  return (
    <section id="sss" className="py-20">
      <div className="section-container">
        <h3 className="text-2xl font-bold sm:text-3xl">Sık Sorulan Sorular</h3>
        <div className="mt-8 grid gap-4">
          {faqs.map((item, index) => (
            <motion.article
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="glass-card"
            >
              <h4 className="text-base font-semibold">{item.q}</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
