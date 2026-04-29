"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Magnetic } from "@/components/shared/magnetic";

const words = ["Sağlığa şefkat,", "kodlara hassasiyet."];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 md:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-mesh" />
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-white/70 px-4 py-1.5 text-xs font-medium text-brand-bronze backdrop-blur dark:bg-white/5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-mint" />
            </span>
            <MapPin size={12} />
            Bursa, Türkiye — Yeni projelere açık
          </span>
        </motion.div>

        <h1 className="mx-auto max-w-5xl text-center font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[1.02] tracking-tight text-brand-ink dark:text-brand-cream">
          {words.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === 1 ? <span className="text-gradient-gold italic">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-8 max-w-2xl text-center text-lg text-brand-mist md:text-xl dark:text-brand-cream/80"
        >
          Muhammed Emin Türkoğlu — Bursa Şehir Hastanesi&apos;nde hemşire, aynı zamanda Next.js ve dijital strateji ile markaları geleceğe taşıyan bir geliştirici.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <Link href="/projeler" className="btn-primary">
              <Sparkles size={16} />
              Projelerimi Gör
              <ArrowRight size={16} />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/iletisim" className="btn-ghost">
              Birlikte Çalışalım
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-mist">
            <span>Aşağı kaydır</span>
            <span className="relative h-10 w-[2px] overflow-hidden rounded-full bg-brand-gold/30">
              <motion.span
                className="absolute inset-x-0 top-0 h-3 rounded-full bg-brand-bronze"
                animate={{ y: [-12, 40] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
