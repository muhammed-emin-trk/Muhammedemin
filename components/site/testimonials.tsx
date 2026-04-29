"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const items = [...testimonials, ...testimonials];
  return (
    <section className="section-block">
      <div className="section-container">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Yorumlar</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
            Birlikte çalıştığım ekipler ne diyor?
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg-via)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg-via)] to-transparent" />
        <motion.div
          className="flex w-max gap-6 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {items.map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              className="glass-card flex w-[360px] shrink-0 flex-col gap-4 p-6 md:w-[420px]"
            >
              <Quote className="text-brand-gold" />
              <p className="text-brand-charcoal dark:text-brand-cream/90">{t.content}</p>
              <div className="mt-auto flex items-center gap-3 pt-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-gold/40"
                />
                <div>
                  <p className="font-medium text-brand-ink dark:text-brand-cream">{t.name}</p>
                  <p className="text-xs text-brand-mist">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5 text-brand-gold">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
