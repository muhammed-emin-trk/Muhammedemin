"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, MapPin, Stethoscope, Code2, Camera, HeartHandshake, Star } from "lucide-react";
import { Magnetic } from "@/components/shared/magnetic";

const ROLES = [
  { icon: Stethoscope, text: "Hemşire" },
  { icon: Code2, text: "Yazılım Geliştirici" },
  { icon: Camera, text: "Fotoğrafçı" },
  { icon: HeartHandshake, text: "Gönüllü" },
];

const NAME_PARTS = ["Muhammed", "Emin", "Türkoğlu"];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  const Role = ROLES[roleIndex];

  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* Animated mesh gradient */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-mesh" />

      {/* Pulsating gold halo */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/15 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(184,150,98,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(184,150,98,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating decorative chips */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pointer-events-none absolute left-[6%] top-[28%] hidden xl:block"
      >
        <div className="glass-card flex items-center gap-3 px-4 py-3 shadow-glow">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-500/15 text-rose-500">
            <Stethoscope size={16} />
          </span>
          <div>
            <p className="text-xs font-semibold text-brand-ink dark:text-brand-cream">Endoskopi Birimi</p>
            <p className="text-[11px] text-brand-mist">Aktif Hemşire</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute right-[6%] top-[34%] hidden xl:block"
      >
        <div className="glass-card flex items-center gap-3 px-4 py-3 shadow-glow">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-500/15 text-amber-600">
            <Star size={16} fill="currentColor" />
          </span>
          <div>
            <p className="text-xs font-semibold text-brand-ink dark:text-brand-cream">98% Memnuniyet</p>
            <p className="text-[11px] text-brand-mist">30+ proje</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="pointer-events-none absolute right-[10%] bottom-[14%] hidden xl:block"
      >
        <div className="glass-card flex items-center gap-3 px-4 py-3 shadow-glow">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-500/15 text-sky-600">
            <Code2 size={16} />
          </span>
          <div>
            <p className="text-xs font-semibold text-brand-ink dark:text-brand-cream">Next.js 14</p>
            <p className="text-[11px] text-brand-mist">App Router</p>
          </div>
        </div>
      </motion.div>

      <div className="section-container relative">
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
            Osmangazi, Bursa — Yeni fırsatlara açık
          </span>
        </motion.div>

        <h1 className="mx-auto max-w-5xl text-center font-display text-[clamp(2.4rem,7vw,5.6rem)] font-semibold leading-[1.15] tracking-tight text-brand-ink dark:text-brand-cream">
          {NAME_PARTS.map((word, wi) => (
            <motion.span
              key={word}
              className="mx-2 inline-block"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 + wi * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {wi === 2 ? <span className="text-gradient-gold italic">{word}</span> : word}
            </motion.span>
          ))}
        </h1>

        {/* Rotating role */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mx-auto mt-6 flex items-center justify-center gap-3"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-brand-mist">Bir</span>
          <span className="relative inline-flex h-10 min-w-[210px] items-center justify-center overflow-hidden rounded-full border border-brand-gold/40 bg-white/60 px-5 backdrop-blur dark:bg-white/5">
            <motion.span
              key={roleIndex}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 text-sm font-semibold text-gradient-gold"
            >
              <Role.icon size={16} className="text-brand-bronze" />
              {Role.text}
            </motion.span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-center text-lg text-brand-mist md:text-xl dark:text-brand-cream/80"
        >
          İnsan odaklı çalışmayı benimseyen; hemşirelik altyapısını dijital ürün yaklaşımıyla birleştiren, sosyal sorumluluk ve fotoğrafçılıkta aktif bir profesyonel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
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

        {/* Quick stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { k: "5+", v: "Yıl deneyim" },
            { k: "30+", v: "Proje" },
            { k: "1500+", v: "Hasta bakımı" },
            { k: "98%", v: "Memnuniyet" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-2xl border border-brand-gold/30 bg-white/50 px-4 py-3 text-center backdrop-blur dark:bg-white/[0.04]"
            >
              <p className="font-display text-2xl text-gradient-gold">{s.k}</p>
              <p className="text-xs text-brand-mist dark:text-brand-cream/70">{s.v}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex justify-center"
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
