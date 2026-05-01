"use client";

import { motion } from "framer-motion";
import { Compass, Layers, Code2, Rocket } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const steps = [
  {
    icon: Compass,
    title: "Keşif",
    desc: "Hedef kitlenizi, marka tonunuzu ve hedeflerinizi birlikte netleştiriyoruz.",
    color: "from-amber-500 to-orange-500",
    bg: "from-amber-500/20 to-orange-500/5",
    num: "01",
  },
  {
    icon: Layers,
    title: "Strateji & Tasarım",
    desc: "Bilgi mimarisi, kullanıcı akışı ve premium görsel dil oluşturuyoruz.",
    color: "from-violet-500 to-purple-600",
    bg: "from-violet-500/20 to-purple-600/5",
    num: "02",
  },
  {
    icon: Code2,
    title: "Geliştirme",
    desc: "Performans, erişilebilirlik ve SEO odaklı kod ile ürünü hayata geçiriyoruz.",
    color: "from-sky-500 to-blue-600",
    bg: "from-sky-500/20 to-blue-600/5",
    num: "03",
  },
  {
    icon: Rocket,
    title: "Lansman & Büyüme",
    desc: "Yayına alıyor, ölçüyor, iyileştiriyor; markanızı sürekli ileri taşıyoruz.",
    color: "from-emerald-500 to-teal-600",
    bg: "from-emerald-500/20 to-teal-600/5",
    num: "04",
  },
];

export function Process() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="section-eyebrow">Çalışma süreci</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          Şeffaf, hızlı ve <span className="text-gradient-gold italic">odaklanmış</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/70">
          Her proje dört net adımda ilerler. Sürpriz yok, gecikme yok.
        </p>
      </Reveal>

      <div className="relative mt-16">
        {/* Connecting dashed line */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-9 hidden h-px md:block"
          style={{
            background: "linear-gradient(90deg, transparent 2%, rgba(184,150,98,0.4) 15%, rgba(184,150,98,0.4) 85%, transparent 98%)",
            backgroundSize: "12px 1px",
            backgroundImage: "repeating-linear-gradient(90deg, rgba(184,150,98,0.5) 0px, rgba(184,150,98,0.5) 6px, transparent 6px, transparent 12px)",
          }}
        />

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="group relative"
              >
                {/* Step circle */}
                <div className="relative z-10 mb-6">
                  <motion.div
                    className={`h-[72px] w-[72px] rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-glow ring-4 ring-[var(--bg-via)] transition-transform group-hover:scale-110`}
                    whileHover={{ rotate: 5 }}
                  >
                    <s.icon size={26} className="text-white" />
                  </motion.div>
                  {/* Number badge */}
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-brand-ink text-[10px] font-bold text-brand-cream dark:bg-brand-cream dark:text-brand-ink">
                    {s.num}
                  </span>
                </div>

                {/* Card */}
                <div className={`relative overflow-hidden rounded-3xl border border-brand-gold/25 bg-white/70 p-5 backdrop-blur dark:bg-white/[0.04]`}>
                  <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.bg} blur-2xl transition-opacity duration-500 opacity-60 group-hover:opacity-100`} />
                  <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-3xl bg-gradient-to-r ${s.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <h3 className="relative font-display text-xl text-brand-ink dark:text-brand-cream">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-brand-mist dark:text-brand-cream/70">{s.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
