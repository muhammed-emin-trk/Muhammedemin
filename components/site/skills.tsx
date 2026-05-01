"use client";

import { motion } from "framer-motion";
import { Stethoscope, Code2, Search, PenTool, HeartPulse, Megaphone } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const skills = [
  {
    icon: Stethoscope,
    title: "Klinik Bakım",
    desc: "Hastane ortamında ileri düzey hasta takibi, kriz yönetimi ve ekip koordinasyonu.",
    span: "md:col-span-2 md:row-span-2",
    accent: "from-rose-400/40 via-rose-300/15 to-transparent",
    iconColor: "text-rose-500",
    bar: "from-rose-500 to-pink-400",
  },
  {
    icon: Code2,
    title: "Web Geliştirme",
    desc: "Next.js, React, TypeScript, Tailwind ile modern arayüzler.",
    span: "md:col-span-2",
    accent: "from-sky-400/40 via-sky-300/15 to-transparent",
    iconColor: "text-sky-500",
    bar: "from-sky-500 to-blue-400",
  },
  {
    icon: Search,
    title: "SEO & Performans",
    desc: "Lighthouse 95+ skorlu, arama motoru dostu yapı.",
    span: "md:col-span-2",
    accent: "from-amber-400/40 via-amber-300/15 to-transparent",
    iconColor: "text-amber-500",
    bar: "from-amber-500 to-yellow-400",
  },
  {
    icon: PenTool,
    title: "Marka Tasarımı",
    desc: "Premium hissi, sade ve hatırlanabilir görsel kimlik.",
    span: "md:col-span-2",
    accent: "from-violet-400/40 via-violet-300/15 to-transparent",
    iconColor: "text-violet-500",
    bar: "from-violet-500 to-purple-400",
  },
  {
    icon: HeartPulse,
    title: "Sağlık Teknolojileri",
    desc: "Klinik iş akışlarına özel dijital çözümler & otomasyon.",
    span: "md:col-span-2",
    accent: "from-emerald-400/40 via-emerald-300/15 to-transparent",
    iconColor: "text-emerald-500",
    bar: "from-emerald-500 to-teal-400",
  },
  {
    icon: Megaphone,
    title: "Dijital Pazarlama",
    desc: "Sosyal medya, içerik stratejisi ve dönüşüm odaklı kampanyalar.",
    span: "md:col-span-2",
    accent: "from-orange-400/40 via-orange-300/15 to-transparent",
    iconColor: "text-orange-500",
    bar: "from-orange-500 to-amber-400",
  },
];

export function Skills() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="section-eyebrow">Uzmanlık</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          İki disiplinin <span className="text-gradient-gold italic">incelikli</span> birleşimi.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/70">
          Hastanedeki disiplin ve insan ilişkisi, dijitalde ürettiğim her satır kodun, tasarladığım her arayüzün arka planında yaşar.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-6 md:auto-rows-[180px]">
        {skills.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06} className={s.span}>
            <motion.article
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative h-full overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/70 p-6 backdrop-blur dark:bg-white/[0.04] cursor-default"
            >
              <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-3xl bg-gradient-to-r ${s.bar} opacity-60 transition-opacity group-hover:opacity-100`} />
              <div className={`pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br ${s.accent} blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className={`inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} ring-1 ring-brand-gold/20`}>
                <s.icon className={s.iconColor} size={22} />
              </div>
              <p className="mt-4 font-display text-xl text-brand-ink dark:text-brand-cream">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-mist dark:text-brand-cream/70">{s.desc}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
