"use client";

import { motion } from "framer-motion";
import { trustLogos } from "@/lib/content";

export function TrustMarquee() {
  const items = [...trustLogos, ...trustLogos];
  return (
    <section className="relative border-y border-brand-gold/20 bg-white/40 py-8 dark:bg-white/[0.02]">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {items.map((logo, i) => (
            <span key={`${logo}-${i}`} className="font-display text-2xl font-medium tracking-wide text-brand-ink/40 dark:text-brand-cream/40">
              {logo}
              <span className="mx-6 text-brand-gold">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
