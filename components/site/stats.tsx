"use client";

import { motion } from "framer-motion";
import { HeartPulse, Code2, GraduationCap, Smile } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Counter } from "@/components/shared/counter";

const stats = [
  {
    icon: HeartPulse,
    label: "Hasta bakımı",
    value: 1500,
    suffix: "+",
    accent: "from-rose-500 to-pink-400",
    blob: "from-rose-500/20 to-rose-300/5",
    iconColor: "text-rose-500",
  },
  {
    icon: Code2,
    label: "Dijital proje",
    value: 30,
    suffix: "+",
    accent: "from-sky-500 to-blue-400",
    blob: "from-sky-500/20 to-sky-300/5",
    iconColor: "text-sky-500",
  },
  {
    icon: GraduationCap,
    label: "Yıl deneyim",
    value: 5,
    suffix: "+",
    accent: "from-amber-500 to-yellow-400",
    blob: "from-amber-500/20 to-amber-300/5",
    iconColor: "text-amber-500",
  },
  {
    icon: Smile,
    label: "Müşteri memnuniyeti",
    value: 98,
    suffix: "%",
    accent: "from-emerald-500 to-teal-400",
    blob: "from-emerald-500/20 to-emerald-300/5",
    iconColor: "text-emerald-500",
  },
];

export function Stats() {
  return (
    <section className="section-container -mt-8 relative z-10">
      <div className="grid gap-5 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card relative overflow-hidden p-6 cursor-default"
            >
              <div className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${s.blob} blur-2xl`} />
              <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-3xl bg-gradient-to-r ${s.accent} opacity-80`} />
              <div className={`inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${s.blob} ring-1 ring-brand-gold/20`}>
                <s.icon className={s.iconColor} size={22} />
              </div>
              <p className="mt-4 font-display text-4xl font-bold text-gradient-gold">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-sm font-medium text-brand-mist dark:text-brand-cream/70">{s.label}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
