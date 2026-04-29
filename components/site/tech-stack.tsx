"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/reveal";

const techs = [
  { name: "Next.js", color: "from-zinc-700 to-zinc-900", glyph: "N" },
  { name: "React", color: "from-sky-400 to-cyan-600", glyph: "⚛" },
  { name: "TypeScript", color: "from-blue-500 to-blue-700", glyph: "TS" },
  { name: "Tailwind", color: "from-cyan-400 to-teal-600", glyph: "✦" },
  { name: "Framer", color: "from-purple-500 to-fuchsia-600", glyph: "F" },
  { name: "Node.js", color: "from-emerald-500 to-green-700", glyph: "⬢" },
  { name: "Figma", color: "from-pink-500 to-orange-500", glyph: "◆" },
  { name: "Vercel", color: "from-zinc-800 to-black", glyph: "▲" },
  { name: "GSAP", color: "from-lime-400 to-green-600", glyph: "G" },
  { name: "Three.js", color: "from-amber-500 to-orange-700", glyph: "△" },
  { name: "Stripe", color: "from-indigo-500 to-violet-600", glyph: "S" },
  { name: "PostgreSQL", color: "from-sky-600 to-indigo-700", glyph: "Pg" },
];

export function TechStack() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Teknoloji yığını</p>
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
              whileHover={{ y: -6, rotate: -1 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="group relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-brand-gold/25 bg-white/70 p-4 backdrop-blur dark:bg-white/[0.04]"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${t.color} opacity-0 transition duration-500 group-hover:opacity-90`}
              />
              <span
                className={`relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${t.color} font-display text-lg font-semibold text-white shadow-glass transition group-hover:scale-110`}
              >
                {t.glyph}
              </span>
              <span className="relative text-xs font-medium text-brand-ink transition group-hover:text-white dark:text-brand-cream">
                {t.name}
              </span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
