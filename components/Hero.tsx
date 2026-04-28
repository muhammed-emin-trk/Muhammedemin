"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const quickStats = [
  { label: "Teslim Edilen Projeler", value: "30+" },
  { label: "Müşteri Memnuniyeti", value: "%98" },
  { label: "Destek Süresi", value: "7/24" },
  { label: "Ana Uzmanlık", value: "Web Uygulamaları" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,140,248,0.25),transparent_55%)]" />
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card mx-auto max-w-6xl"
        >
          <div className="grid items-center gap-10 md:grid-cols-[1.35fr_1fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-indigo">Premium Software Studio</p>
              <h1 className="text-3xl font-bold leading-tight sm:text-5xl">Muhammed Emin Türk</h1>
              <h2 className="mt-4 text-lg text-slate-700 dark:text-slate-300 sm:text-2xl">
                Yazılım • Program Geliştirme • Marka Güveni Odaklı Dijital Çözümler
              </h2>
              <p className="mt-6 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
                Kurumsal güven oluşturan, satış dönüşümünü artıran ve premium algı yaratan modern web siteleri geliştiriyorum.
                Hız, SEO, güvenlik, kullanıcı deneyimi ve sürdürülebilir teknik mimariyi tek pakette sunuyorum.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#hizmetler"
                  className="rounded-full bg-gradient-to-r from-brand-blue to-brand-indigo px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
                >
                  Hizmetleri Keşfet
                </Link>
                <Link
                  href="#iletisim"
                  className="rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:scale-105 hover:border-brand-purple hover:text-brand-purple dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
                >
                  Teklif Al
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              {quickStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/40 bg-white/70 p-4 dark:border-slate-700/50 dark:bg-slate-900/60">
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-lg font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
