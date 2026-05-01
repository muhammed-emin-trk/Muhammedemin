"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { trustLogos } from "@/lib/content";

export function TrustMarquee() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const items = [...trustLogos, ...trustLogos];
  return (
    <section className="relative border-y border-brand-gold/20 bg-white/50 py-6 dark:bg-white/[0.025]">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--bg-from)] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--bg-from)] to-transparent"
        aria-hidden
      />
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={isMobile ? undefined : { x: ["0%", "-50%"] }}
          transition={isMobile ? undefined : { duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {items.map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="font-display text-xl font-semibold tracking-wide text-brand-ink/35 dark:text-brand-cream/35 transition-colors hover:text-brand-bronze/70 dark:hover:text-brand-gold/60"
            >
              {logo}
              <span className="mx-5 text-brand-gold/60">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
