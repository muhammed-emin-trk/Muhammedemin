"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Heart, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const achievements = [
  {
    icon: Trophy,
    title: "Lighthouse 96+",
    desc: "Performans, erişilebilirlik ve SEO skorunda sürekli mükemmellik.",
    color: "from-amber-400 via-yellow-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "1500+ Hasta",
    desc: "Endoskopi biriminde birebir bakım sağlanan hasta sayısı.",
    color: "from-rose-400 via-pink-500 to-red-500",
  },
  {
    icon: Sparkles,
    title: "30+ Proje",
    desc: "Sağlık, marka ve kurumsal alanda teslim edilmiş dijital ürün.",
    color: "from-violet-400 via-purple-500 to-fuchsia-500",
  },
  {
    icon: Zap,
    title: "1.2 sn",
    desc: "Ortalama sayfa açılma süresi. Hız bir lükstür, biz standardımız.",
    color: "from-sky-400 via-blue-500 to-indigo-500",
  },
  {
    icon: ShieldCheck,
    title: "KVKK Uyumlu",
    desc: "Sağlık alanındaki her projede hassas veri güvenliği önceliklidir.",
    color: "from-emerald-400 via-teal-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Avrupa Gönüllü",
    desc: "EVS programı kapsamında uluslararası sosyal sorumluluk deneyimi.",
    color: "from-orange-400 via-amber-500 to-yellow-500",
  },
];

export function Achievements() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Başarılar</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          Sahnede değil, <span className="text-gradient-gold italic">sahada</span> kazanılmış.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group relative overflow-hidden rounded-3xl border border-brand-gold/25 bg-white/70 p-7 backdrop-blur dark:bg-white/[0.04]"
            >
              <div className={`pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br ${a.color} opacity-15 blur-2xl transition group-hover:opacity-40`} />
              <div className={`relative inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-glow`}>
                <a.icon size={22} />
              </div>
              <h3 className="relative mt-5 font-display text-2xl text-brand-ink dark:text-brand-cream">{a.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-brand-mist dark:text-brand-cream/75">{a.desc}</p>
              <div className="relative mt-6 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
