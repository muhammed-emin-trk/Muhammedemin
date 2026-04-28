"use client";

import { Mail, Phone, Linkedin, Instagram, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const contacts = [
  { label: "E-posta", value: "muhammedeminturk.16@gmail.com", href: "mailto:muhammedeminturk.16@gmail.com", icon: Mail },
  { label: "Telefon", value: "0546 285 18 26", href: "tel:+905462851826", icon: Phone },
  { label: "WhatsApp", value: "+90 546 285 18 26", href: "https://wa.me/905462851826", icon: MessageCircle },
  { label: "Lokasyon", value: "Bursa / İstanbul", href: "#", icon: MapPin },
  { label: "Instagram", value: "@muhammedemin", href: "https://instagram.com", icon: Instagram },
  { label: "LinkedIn", value: "linkedin.com/in/muhammedemin", href: "https://linkedin.com", icon: Linkedin },
];

export default function Contact() {
  return (
    <section id="iletisim" className="py-20">
      <div className="section-container">
        <h3 className="text-2xl font-bold sm:text-3xl">İletişim</h3>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {contacts.map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-card block transition hover:-translate-y-1"
              >
                <contact.icon className="text-brand-indigo" size={20} />
                <p className="mt-3 text-sm font-medium">{contact.label}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{contact.value}</p>
              </motion.a>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card space-y-4"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Yazılım geliştirme, premium web sitesi dönüşümü ve dijital büyüme hedefleriniz için mesaj bırakın.
            </p>
            <input
              type="text"
              placeholder="İsim"
              className="w-full rounded-xl border border-slate-300/70 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-brand-indigo dark:border-slate-700 dark:bg-slate-900/60"
            />
            <input
              type="email"
              placeholder="E-posta"
              className="w-full rounded-xl border border-slate-300/70 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-brand-indigo dark:border-slate-700 dark:bg-slate-900/60"
            />
            <textarea
              placeholder="Proje hedefinizi ve istediğiniz özellikleri yazın"
              rows={5}
              className="w-full rounded-xl border border-slate-300/70 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-brand-indigo dark:border-slate-700 dark:bg-slate-900/60"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Teklif Talebi Gönder
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
