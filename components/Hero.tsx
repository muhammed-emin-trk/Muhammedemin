"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient py-24 sm:py-32">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-indigo">
            Hoş Geldiniz
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Merhaba, ben Muhammed Emin Türkoğlu
          </h1>
          <h2 className="mt-4 text-lg text-slate-700 dark:text-slate-300 sm:text-2xl">
            Hemşire & Yazılım Geliştirici
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            İnsan odaklı sağlık yaklaşımımı teknolojiyle buluşturarak etkili dijital çözümler ve sürdürülebilir
            projeler geliştiriyorum.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#hakkimda"
              className="rounded-full bg-gradient-to-r from-brand-blue to-brand-indigo px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
            >
              Hakkımda
            </Link>
            <Link
              href="#iletisim"
              className="rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:scale-105 hover:border-brand-purple hover:text-brand-purple dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
            >
              İletişime Geç
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
