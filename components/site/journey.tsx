"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, HeartPulse, Globe2, Code2, Camera, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const milestones = [
  {
    year: "2018",
    title: "Hemşirelik Eğitimi",
    desc: "Uludağ Üniversitesi&apos;nde hemşirelik bölümüne başladım; insan odaklı bakım disiplininin temellerini attım.",
    icon: GraduationCap,
    color: "from-rose-500 to-pink-600",
  },
  {
    year: "2020",
    title: "Avrupa Gönüllü Hizmeti",
    desc: "Yurtdışında çocuklarla yürütülen sosyal sorumluluk projelerinde aktif rol aldım, kültürlerarası iletişim becerilerimi geliştirdim.",
    icon: Globe2,
    color: "from-emerald-500 to-teal-600",
  },
  {
    year: "2022",
    title: "Sahada Hemşirelik",
    desc: "Endoskopi biriminde aktif hemşire olarak çalışmaya başladım; 1500+ hasta ile birebir bakım deneyimi.",
    icon: HeartPulse,
    color: "from-red-500 to-rose-600",
  },
  {
    year: "2023",
    title: "Yazılıma Adım",
    desc: "Next.js, React ve modern web teknolojileriyle dijital ürünler üretmeye başladım. İlk premium müşteri projeleri.",
    icon: Code2,
    color: "from-sky-500 to-blue-600",
  },
  {
    year: "2024",
    title: "Fotoğrafçılık & Marka",
    desc: "Görsel hikaye anlatımı ve marka kimliği üzerine yoğunlaştım; portfolyo işleri arttı.",
    icon: Camera,
    color: "from-amber-500 to-orange-600",
  },
  {
    year: "2026",
    title: "Bugün — Çift Disiplin",
    desc: "Hastane ve stüdyo arasında dengeyi koruyarak; sağlık, kod ve insan hikayeleri arasında köprü kuruyorum.",
    icon: Sparkles,
    color: "from-violet-500 to-fuchsia-600",
  },
];

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]);

  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Yolculuk</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          Hastaneden ekrana, <span className="text-gradient-gold italic">tek bir hikaye</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/70">
          Her yıl yeni bir disiplin, yeni bir öğrenme. Bugünkü işleri besleyen yol haritası.
        </p>
      </Reveal>

      <div ref={ref} className="relative mt-16" style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          aria-hidden
          className="absolute left-6 top-0 h-full w-px bg-brand-gold/20 md:left-1/2 md:-translate-x-1/2"
        />
        <motion.div
          aria-hidden
          style={{ height: lineHeight }}
          className="absolute left-6 top-0 w-px bg-gradient-to-b from-brand-bronze via-brand-gold to-brand-copper md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-12">
          {milestones.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={m.year} delay={0.06}>
                <div className={`relative grid items-center gap-6 md:grid-cols-2 ${left ? "" : "md:[direction:rtl]"}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-2 z-10 -translate-x-1/2 md:left-1/2">
                    <span className={`block h-4 w-4 rounded-full bg-gradient-to-br ${m.color} ring-4 ring-[var(--bg-via)]`} />
                  </div>

                  {/* Card side */}
                  <div className={`pl-16 md:pl-0 ${left ? "md:pr-16" : "md:pl-16"} [direction:ltr]`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="group relative overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/70 p-6 shadow-glass backdrop-blur dark:bg-white/[0.04]"
                    >
                      <div className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${m.color} opacity-10 blur-2xl transition group-hover:opacity-25`} />
                      <div className="flex items-center gap-3">
                        <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${m.color} text-white shadow-glow`}>
                          <m.icon size={20} />
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-brand-bronze">{m.year}</p>
                          <h3 className="font-display text-xl text-brand-ink dark:text-brand-cream">{m.title}</h3>
                        </div>
                      </div>
                      <p
                        className="mt-4 text-sm leading-relaxed text-brand-mist dark:text-brand-cream/75"
                        dangerouslySetInnerHTML={{ __html: m.desc }}
                      />
                    </motion.div>
                  </div>

                  {/* Empty side spacer for alternating layout */}
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
