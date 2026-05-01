"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/reveal";

const techs = [
  { name: "Next.js", color: "from-zinc-700 to-zinc-900", glyph: "N", glow: "rgba(100,100,100,0.4)" },
  { name: "React", color: "from-sky-400 to-cyan-600", glyph: "⚛", glow: "rgba(14,165,233,0.4)" },
  { name: "TypeScript", color: "from-blue-500 to-blue-700", glyph: "TS", glow: "rgba(59,130,246,0.4)" },
  { name: "Tailwind", color: "from-cyan-400 to-teal-600", glyph: "✦", glow: "rgba(20,184,166,0.4)" },
  { name: "Framer", color: "from-purple-500 to-fuchsia-600", glyph: "F", glow: "rgba(168,85,247,0.4)" },
  { name: "Node.js", color: "from-emerald-500 to-green-700", glyph: "⬢", glow: "rgba(16,185,129,0.4)" },
  { name: "Figma", color: "from-pink-500 to-orange-500", glyph: "◆", glow: "rgba(236,72,153,0.4)" },
  { name: "Vercel", color: "from-zinc-700 to-black", glyph: "▲", glow: "rgba(50,50,50,0.4)" },
  { name: "GSAP", color: "from-lime-400 to-green-600", glyph: "G", glow: "rgba(163,230,53,0.4)" },
  { name: "Three.js", color: "from-amber-500 to-orange-700", glyph: "△", glow: "rgba(245,158,11,0.4)" },
  { name: "Stripe", color: "from-indigo-500 to-violet-600", glyph: "S", glow: "rgba(99,102,241,0.4)" },
  { name: "PostgreSQL", color: "from-sky-600 to-indigo-700", glyph: "Pg", glow: "rgba(14,165,233,0.4)" },
];

export function TechStack() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="section-eyebrow">Teknoloji yığını</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          Premium ürünlerin <span className="text-gradient-gold italic">temel taşları</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/70">
          Modern web&apos;in gerektirdiği hız, erişilebilirlik ve estetiği aynı kararlılıkla bir araya getiren araçlar.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {techs.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.04}>
            <motion.div
              whileHover={{ y: -8, scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="group relative flex aspect-square flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-brand-gold/25 bg-white/75 p-4 backdrop-blur dark:bg-white/[0.05] cursor-default"
            >
              {/* Hover background fill */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${t.color} opacity-0 transition-opacity duration-400 group-hover:opacity-95 rounded-2xl`}
              />

              {/* Glow ring on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{ boxShadow: `0 0 30px ${t.glow}, 0 0 60px ${t.glow.replace("0.4", "0.2")}` }}
              />

              {/* Icon */}
              <div
                className={`relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${t.color} font-display text-base font-bold text-white shadow-glass transition-transform duration-300 group-hover:scale-110`}
              >
                {t.glyph}
              </div>

              <span className="relative text-xs font-semibold text-brand-ink transition-colors duration-300 group-hover:text-white dark:text-brand-cream">
                {t.name}
              </span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
