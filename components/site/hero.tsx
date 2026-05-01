"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, MapPin, Stethoscope, Code2, Camera, HeartHandshake, Star, Zap } from "lucide-react";
import { Magnetic } from "@/components/shared/magnetic";

const ROLES = [
  { icon: Stethoscope, text: "Hemşire", color: "text-rose-500", bg: "bg-rose-500/15" },
  { icon: Code2, text: "Yazılım Geliştirici", color: "text-sky-500", bg: "bg-sky-500/15" },
  { icon: Camera, text: "Fotoğrafçı", color: "text-violet-500", bg: "bg-violet-500/15" },
  { icon: HeartHandshake, text: "Gönüllü", color: "text-emerald-500", bg: "bg-emerald-500/15" },
];

const NAME_PARTS = ["Muhammed", "Emin", "Türkoğlu"];

type HeroSettings = {
  hero_badge?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
};

export function Hero({ settings }: { settings?: HeroSettings }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const badge = settings?.hero_badge || "Osmangazi, Bursa — Yeni fırsatlara açık";
  const description = settings?.hero_description ||
    "İnsan odaklı çalışmayı benimseyen; hemşirelik altyapısını dijital ürün yaklaşımıyla birleştiren, sosyal sorumluluk ve fotoğrafçılıkta aktif bir profesyonel.";

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  const Role = ROLES[roleIndex];

  return (
    <section className="relative overflow-hidden pt-36 pb-28 md:pt-48 md:pb-36">
      {/* Multi-layer animated mesh gradient */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-mesh" />

      {/* Primary gold halo — pulsating */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/12 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary violet accent */}
      <motion.div
        aria-hidden
        className="absolute -bottom-32 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-brand-violet/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Copper accent top-right */}
      <motion.div
        aria-hidden
        className="absolute -right-24 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-brand-copper/15 blur-3xl"
        animate={{ scale: [1, 1.15, 1], y: [0, 30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(184,150,98,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating decorative chips */}
      <motion.div
        initial={{ opacity: 0, y: 24, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.2, duration: 0.9 }}
        className="pointer-events-none absolute left-[5%] top-[26%] hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.4, duration: 0.9 }}
        className="pointer-events-none absolute right-[5%] top-[32%] hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="glass-card flex items-center gap-3 px-4 py-3 shadow-glow">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-500/15 text-amber-500">
              <Star size={16} fill="currentColor" />
            </span>
            <div>
              <p className="text-xs font-semibold text-brand-ink dark:text-brand-cream">98% Memnuniyet</p>
              <p className="text-[11px] text-brand-mist">30+ proje</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9 }}
        className="pointer-events-none absolute right-[9%] bottom-[18%] hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="glass-card flex items-center gap-3 px-4 py-3 shadow-glow">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-500/15 text-sky-500">
              <Zap size={16} />
            </span>
            <div>
              <p className="text-xs font-semibold text-brand-ink dark:text-brand-cream">Hız Odaklı</p>
              <p className="text-[11px] text-brand-mist">Next.js 14</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="section-container relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-gold/40 bg-white/70 px-5 py-2 text-xs font-semibold text-brand-bronze shadow-glow-sm backdrop-blur dark:bg-white/[0.07]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-mint" />
            </span>
            <MapPin size={11} />
            {badge}
          </span>
        </motion.div>

        {/* Main heading */}
        <h1 className="mx-auto max-w-5xl text-center font-display text-[clamp(2.6rem,7.5vw,5.8rem)] font-semibold leading-[1.12] tracking-tight text-brand-ink dark:text-brand-cream">
          {NAME_PARTS.map((word, wi) => (
            <motion.span
              key={word}
              className="mx-2 inline-block"
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 + wi * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {wi === 2 ? (
                <span className="relative">
                  <span className="text-gradient-gold italic">{word}</span>
                  <motion.span
                    className="absolute -right-6 -top-2 text-lg"
                    animate={{ rotate: [0, 15, 0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  >
                    ✨
                  </motion.span>
                </span>
              ) : word}
            </motion.span>
          ))}
        </h1>

        {/* Rotating role */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mx-auto mt-7 flex items-center justify-center gap-3"
        >
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-brand-mist">Bir</span>
          <span className="relative inline-flex h-11 min-w-[230px] items-center justify-center overflow-hidden rounded-full border border-brand-gold/40 bg-white/65 px-6 shadow-glow-sm backdrop-blur dark:bg-white/[0.06]">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 22, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -22, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2.5 text-sm font-bold"
              >
                <span className={`grid h-6 w-6 place-items-center rounded-full ${Role.bg} ${Role.color}`}>
                  <Role.icon size={13} />
                </span>
                <span className="text-gradient-gold">{Role.text}</span>
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68 }}
          className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-brand-mist md:text-xl dark:text-brand-cream/80"
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.82 }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
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
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { k: "5+", v: "Yıl deneyim", c: "from-amber-400/20 to-amber-300/5" },
            { k: "30+", v: "Proje", c: "from-sky-400/20 to-sky-300/5" },
            { k: "1500+", v: "Hasta bakımı", c: "from-rose-400/20 to-rose-300/5" },
            { k: "98%", v: "Memnuniyet", c: "from-emerald-400/20 to-emerald-300/5" },
          ].map((s, i) => (
            <motion.div
              key={s.v}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className={`relative overflow-hidden rounded-2xl border border-brand-gold/30 bg-gradient-to-br ${s.c} bg-white/55 px-4 py-4 text-center backdrop-blur dark:bg-white/[0.04]`}
            >
              <p className="font-display text-2xl font-bold text-gradient-gold">{s.k}</p>
              <p className="mt-0.5 text-xs text-brand-mist dark:text-brand-cream/70">{s.v}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-brand-mist">
            <span>Aşağı kaydır</span>
            <span className="relative h-10 w-[2px] overflow-hidden rounded-full bg-brand-gold/25">
              <motion.span
                className="absolute inset-x-0 top-0 h-4 rounded-full bg-gradient-to-b from-brand-bronze to-brand-gold"
                animate={{ y: [-16, 40] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
