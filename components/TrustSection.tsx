"use client";

import { motion } from "framer-motion";
import { BadgeCheck, LockKeyhole, MessagesSquare, TimerReset } from "lucide-react";

const trustItems = [
  {
    title: "Şeffaf Proje Takibi",
    text: "Her aşama net şekilde raporlanır, belirsizlik bırakmadan ilerlenir.",
    icon: BadgeCheck,
  },
  {
    title: "Hızlı Geri Dönüş",
    text: "İletişimde gecikme olmaz. Revizeler ve kritik talepler hızla yönetilir.",
    icon: MessagesSquare,
  },
  {
    title: "Güvenlik Önceliği",
    text: "Form ve veri güvenliği için iyi pratiklere uygun teknik altyapı kurulur.",
    icon: LockKeyhole,
  },
  {
    title: "Süreklilik",
    text: "Teslim sonrası bakım ve geliştirme desteği ile siteniz güncel kalır.",
    icon: TimerReset,
  },
];

export default function TrustSection() {
  return (
    <section id="guven" className="py-20">
      <div className="section-container">
        <h3 className="text-2xl font-bold sm:text-3xl">Güven & Memnuniyet Standartları</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="glass-card"
            >
              <item.icon className="text-brand-indigo" size={26} />
              <h4 className="mt-4 text-base font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
