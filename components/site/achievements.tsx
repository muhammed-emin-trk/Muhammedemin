"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Code2, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const achievements = [
  {
    icon: Trophy,
    title: "Lighthouse 96+",
    desc: "Performans, erişilebilirlik ve SEO skorunda sürekli mükemmellik.",
    color: "from-amber-400 via-yellow-500 to-orange-500",
    glow: "rgba(245,158,11,0.35)",
    num: "96+",
  },
  {
    icon: Code2,
    title: "40+ Yazılım Projesi",
    desc: "Kurumsal web sitesi, landing page ve dashboard teslimleri.",
    color: "from-rose-400 via-pink-500 to-red-500",
    glow: "rgba(244,63,94,0.35)",
    num: "1.5K+",
  },
  {
    icon: Sparkles,
    title: "30+ Proje",
    desc: "Sağlık, marka ve kurumsal alanda teslim edilmiş dijital ürün.",
    color: "from-violet-400 via-purple-500 to-fuchsia-500",
    glow: "rgba(139,92,246,0.35)",
    num: "30+",
  },
  {
    icon: Zap,
    title: "1.2 sn",
    desc: "Ortalama sayfa açılma süresi. Hız bir lükstür, biz standardımız.",
    color: "from-sky-400 via-blue-500 to-indigo-500",
    glow: "rgba(14,165,233,0.35)",
    num: "1.2s",
  },
  {
    icon: ShieldCheck,
    title: "KVKK Uyumlu",
    desc: "Sağlık alanındaki her projede hassas veri güvenliği önceliklidir.",
    color: "from-emerald-400 via-teal-500 to-cyan-500",
    glow: "rgba(16,185,129,0.35)",
    num: "✓",
  },
  {
    icon: Award,
    title: "Avrupa Gönüllü",
    desc: "EVS programı kapsamında uluslararası sosyal sorumluluk deneyimi.",
    color: "from-orange-400 via-amber-500 to-yellow-500",
    glow: "rgba(249,115,22,0.35)",
    num: "EU",
  },
];

export function Achievements() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="section-eyebrow">Başarılar</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          Sahnede değil, <span className="text-gradient-gold italic">sahada</span> kazanılmış.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/70">
          Rakamlar anlatmaya başladığında sözcüklere gerek kalmıyor.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.07}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group relative overflow-hidden rounded-3xl border border-brand-gold/25 bg-white/75 p-7 backdrop-blur dark:bg-white/[0.05] cursor-default"
            >
              {/* Background glow */}
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br ${a.color} opacity-12 blur-3xl transition-opacity duration-500 group-hover:opacity-35`}
              />
              {/* Top bar */}
              <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-3xl bg-gradient-to-r ${a.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

              {/* Icon + number side by side */}
              <div className="flex items-start justify-between">
                <div className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-glow transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <a.icon size={22} />
                </div>
                <span
                  className="font-display text-4xl font-bold leading-none"
                  style={{
                    background: `linear-gradient(135deg, ${a.glow.replace("0.35", "1")}, rgba(184,150,98,1))`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "brightness(0.85)",
                  }}
                >
                  {a.num}
                </span>
              </div>

              <h3 className="relative mt-5 font-display text-xl text-brand-ink dark:text-brand-cream">{a.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-brand-mist dark:text-brand-cream/75">{a.desc}</p>

              {/* Divider */}
              <div className="relative mt-5 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent group-hover:via-brand-gold/60 transition-all" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
