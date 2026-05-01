"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/reveal";

type T = { id: number; name: string; role: string | null; avatar: string | null; content: string | null; rating: number };

export function Testimonials({ items: data }: { items: T[] }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  if (!data?.length) return null;
  const items = [...data, ...data];

  return (
    <section className="section-block relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-brand-gold/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-gradient-to-br from-brand-copper/10 to-transparent blur-3xl" />

      <div className="section-container">
        <Reveal>
          <p className="section-eyebrow">Yorumlar</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
            Birlikte çalıştığım ekipler ne diyor?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/70">
            Her proje bir ilişki kurmakla başlıyor. Söz müşterilerimde.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-12 overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--bg-via)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--bg-via)] to-transparent" />

        <motion.div
          className="flex w-max gap-5 px-6"
          animate={isMobile ? undefined : { x: ["0%", "-50%"] }}
          transition={isMobile ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {items.map((t, i) => (
            <article
              key={`${t.id}-${i}`}
              className="group relative flex w-[360px] shrink-0 flex-col gap-4 overflow-hidden rounded-3xl border border-brand-gold/25 bg-white/80 p-7 backdrop-blur dark:bg-white/[0.05] md:w-[420px]"
            >
              {/* Glow blob */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-bronze/5 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Stars */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-brand-gold">
                  {Array.from({ length: t.rating || 5 }).map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" />
                  ))}
                </div>
                <Quote size={20} className="text-brand-gold/50" />
              </div>

              {/* Content */}
              <p className="flex-1 text-sm leading-relaxed text-brand-charcoal dark:text-brand-cream/90">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

              {/* Author */}
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-gold/40"
                  />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-bronze to-brand-copper font-display text-lg font-semibold text-white ring-2 ring-brand-gold/40">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-brand-ink dark:text-brand-cream">{t.name}</p>
                  <p className="text-xs text-brand-mist">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
