"use client";

import { motion } from "framer-motion";
import { Activity, LineChart, MonitorSmartphone } from "lucide-react";

const services = [
  {
    title: "Web Sitesi Tasarımı & Geliştirme",
    description: "Modern arayüzler, hızlı performans ve mobil uyumlu yapılarla profesyonel web deneyimleri.",
    icon: MonitorSmartphone,
  },
  {
    title: "Dijital Pazarlama & SEO",
    description: "Marka görünürlüğünü artıran stratejik SEO ve veri odaklı dijital pazarlama çalışmaları.",
    icon: LineChart,
  },
  {
    title: "Sağlık Sektörü için Dijital Çözümler",
    description: "Sağlık profesyonellerinin ihtiyaçlarına uygun kullanıcı dostu dijital ürün ve süreç tasarımları.",
    icon: Activity,
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="py-20">
      <div className="section-container">
        <h3 className="text-2xl font-bold sm:text-3xl">Hizmetler</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card transition hover:-translate-y-1"
            >
              <service.icon className="text-brand-indigo" size={32} />
              <h4 className="mt-4 text-lg font-semibold">{service.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
