"use client";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="section-container pt-20 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl rounded-3xl border border-brand-gold/35 bg-white/70 p-8 shadow-[0_16px_40px_rgba(89,58,17,0.1)] backdrop-blur"
      >
        <p className="mb-4 inline-flex rounded-full border border-brand-gold/50 bg-brand-cream px-4 py-1 text-sm font-medium text-brand-ink/90">
          Kişisel Marka ve Portfolyo
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-brand-ink md:text-6xl">Muhammed Emin Türkoğlu</h1>
        <p className="mt-5 text-lg text-brand-ink/85 md:text-xl">Hemşire · Yazılım Geliştirici · Dijital Stratejist</p>
      </motion.div>
    </section>
  );
}
