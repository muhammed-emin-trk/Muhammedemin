"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, HeartPulse, Globe2, Code2, Camera, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const milestones = [
  {
    year: "2018",
    title: "Hemşirelik Eğitimi",
    desc: "Uludağ Üniversitesi'nde hemşirelik bölümüne başladım; insan odaklı bakım disiplininin temellerini attım.",
    icon: GraduationCap,
    color: "from-rose-500 to-pink-600",
    glow: "rgba(244,63,94,0.3)",
  },
  {
    year: "2020",
    title: "Avrupa Gönüllü Hizmeti",
    desc: "Yurtdışında çocuklarla yürütülen sosyal sorumluluk projelerinde aktif rol aldım, kültürlerarası iletişim becerilerimi geliştirdim.",
    icon: Globe2,
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    year: "2022",
    title: "Sahada Hemşirelik",
    desc: "Endoskopi biriminde aktif hemşire olarak çalışmaya başladım; 1500+ hasta ile birebir bakım deneyimi.",
    icon: HeartPulse,
    color: "from-red-500 to-rose-600",
    glow: "rgba(239,68,68,0.3)",
  },
  {
    year: "2023",
    title: "Yazılıma Adım",
    desc: "Next.js, React ve modern web teknolojileriyle dijital ürünler üretmeye başladım. İlk premium müşteri projeleri.",
    icon: Code2,
    color: "from-sky-500 to-blue-600",
    glow: "rgba(14,165,233,0.3)",
  },
  {
    year: "2024",
    title: "Fotoğrafçılık & Marka",
    desc: "Görsel hikaye anlatımı ve marka kimliği üzerine yoğunlaştım; portfolyo işleri arttı.",
    icon: Camera,
    color: "from-amber-500 to-orange-600",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    year: "2026",
    title: "Bugün — Çift Disiplin",
    desc: "Hastane ve stüdyo arasında dengeyi koruyarak; sağlık, kod ve insan hikayeleri arasında köprü kuruyorum.",
    icon: Sparkles,
    color: "from-violet-500 to-fuchsia-600",
    glow: "rgba(139,92,246,0.3)",
  },
];

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]);

  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="section-eyebrow">Yolculuk</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          Hastaneden ekrana, <span className="text-gradient-gold italic">tek bir hikaye</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/70">
          Her yıl yeni bir disiplin, yeni bir öğrenme. Bugünkü işleri besleyen yol haritası.
        </p>
      </Reveal>

      <div ref={ref} className="relative mt-16">
        {/* Background line (faint) */}
        <div
          aria-hidden
          className="absolute left-6 top-0 h-full w-px bg-brand-gold/15 md:left-1/2 md:-translate-x-1/2"
        />
        {/* Animated fill line */}
        <motion.div
          aria-hidden
          style={{ height: lineHeight }}
          className="absolute left-6 top-0 w-px md:left-1/2 md:-translate-x-1/2"
          style={{
            height: lineHeight as any,
            background: "linear-gradient(to bottom, #c8a96e, #b89662, #a07040)",
            boxShadow: "0 0 12px rgba(184,150,98,0.5)",
          }}
        />

        <div className="space-y-14">
          {milestones.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={m.year} delay={0.05}>
                <div className={`relative grid items-center gap-6 md:grid-cols-2 ${left ? "" : "md:[direction:rtl]"}`}>
                  {/* Timeline dot with glow */}
                  <div className="absolute left-6 top-4 z-10 -translate-x-1/2 md:left-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                      <span
                        className={`block h-5 w-5 rounded-full bg-gradient-to-br ${m.color} ring-4 ring-[var(--bg-via)]`}
                        style={{ boxShadow: `0 0 16px ${m.glow}` }}
                      />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`pl-16 md:pl-0 ${left ? "md:pr-14" : "md:pl-14"} [direction:ltr]`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="group relative overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/80 p-7 backdrop-blur dark:bg-white/[0.05]"
                      style={{ boxShadow: "0 4px 24px -8px rgba(0,0,0,0.08)" }}
                    >
                      {/* Corner glow */}
                      <div
                        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${m.color} blur-3xl transition-opacity duration-500`}
                        style={{ opacity: 0.12 }}
                      />
                      <div
                        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${m.color} blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-30`}
                      />

                      {/* Top accent bar */}
                      <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-3xl bg-gradient-to-r ${m.color} opacity-50 group-hover:opacity-100 transition-opacity`} />

                      <div className="flex items-center gap-4">
                        <motion.span
                          whileHover={{ rotate: 10 }}
                          className={`grid h-13 w-13 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${m.color} text-white shadow-glow`}
                          style={{ height: 52, width: 52 }}
                        >
                          <m.icon size={22} />
                        </motion.span>
                        <div>
                          <p
                            className="text-xs font-bold uppercase tracking-[0.3em]"
                            style={{
                              background: `linear-gradient(135deg, #b89662, #c8a96e)`,
                              WebkitBackgroundClip: "text",
                              backgroundClip: "text",
                              color: "transparent",
                            }}
                          >
                            {m.year}
                          </p>
                          <h3 className="font-display text-xl text-brand-ink dark:text-brand-cream">{m.title}</h3>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-brand-mist dark:text-brand-cream/75">
                        {m.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block [direction:ltr]" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
