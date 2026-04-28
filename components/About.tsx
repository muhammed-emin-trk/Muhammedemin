"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    date: "2018 - Günümüz",
    title: "Fotoğrafçılık & Gönüllülük",
    description:
      "Etkinlik, konferans ve sosyal sorumluluk projelerinde fotoğraf odaklı içerik üretiyor; çocuklar ve gençlerle gönüllülük çalışmalarında aktif rol alıyorum.",
  },
  {
    date: "2017 - Günümüz",
    title: "Hemşirelik Kariyeri",
    description:
      "Uludağ Üniversitesi Hemşirelik eğitimi sonrası hasta bakımı, iletişim ve kriz yönetimi alanlarında sahada güçlü bir tecrübe kazandım.",
  },
  {
    date: "2018",
    title: "European Voluntary Service",
    description:
      "Macaristan merkezli projelerde çocuk odaklı faaliyetler, festival ve sosyal etkileşim organizasyonlarında gönüllü olarak yer aldım.",
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
            İnsan odaklı bakış açısını teknoloji, estetik ve iletişimle birleştiren çok yönlü bir profesyonelim. Hem
            sağlık alanındaki disiplinim hem de fotoğraf ve içerik tarafındaki yaratıcı yaklaşımım sayesinde kişisel
            markamı güçlü bir şekilde geliştiriyorum.
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
