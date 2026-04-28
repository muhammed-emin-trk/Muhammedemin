"use client";

import { motion } from "framer-motion";
import { Bot, LineChart, MonitorSmartphone, ShieldCheck, ShoppingCart, Workflow } from "lucide-react";

const services = [
  {
    title: "Kurumsal Web Sitesi Tasarımı",
    description: "Güven veren, premium görünümde ve mobil uyumlu kurumsal web siteleri.",
    icon: MonitorSmartphone,
  },
  {
    title: "E-Ticaret ve Satış Odaklı Sayfalar",
    description: "Ürün/hizmet satışı için dönüşüm odaklı arayüz, ödeme akışı ve teklif formları.",
    icon: ShoppingCart,
  },
  {
    title: "Teknik SEO & Hız Optimizasyonu",
    description: "Google görünürlüğü için temiz kod, metadata, sayfa hızı ve teknik SEO iyileştirmeleri.",
    icon: LineChart,
  },
  {
    title: "Yazılım Süreç Otomasyonu",
    description: "Tekrarlayan işlerin otomasyonu, CRM entegrasyonu ve operasyonel verimlilik çözümleri.",
    icon: Workflow,
  },
  {
    title: "Yapay Zekâ Destekli Özellikler",
    description: "Akıllı form önerileri, chatbot senaryoları ve içerik üretimini destekleyen AI entegrasyonları.",
    icon: Bot,
  },
  {
    title: "Güvenlik & Bakım",
    description: "Periyodik güncelleme, izleme, yedekleme ve teknik destek ile sürdürülebilir yapı.",
    icon: ShieldCheck,
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="py-20">
      <div className="section-container">
        <h3 className="text-2xl font-bold sm:text-3xl">Hizmetler</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
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
