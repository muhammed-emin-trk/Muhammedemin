"use client";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20">
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-white">
        Muhammed Emin Türkoğlu
      </motion.h1>
      <p className="mt-4 text-xl text-cyan-300">Hemşire · Yazılım Geliştirici · Dijital Stratejist</p>
    </section>
  );
}
