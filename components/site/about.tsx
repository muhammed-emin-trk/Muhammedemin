"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Brain, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { motion } from "framer-motion";

const values = [
  {
    icon: HeartHandshake,
    title: "Empati",
    desc: "İnsanı merkeze alan bakım anlayışı",
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
  {
    icon: Brain,
    title: "Disiplin",
    desc: "Sahada edinilen düzenli çalışma yaklaşımı",
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50 dark:bg-sky-900/20",
  },
  {
    icon: Sparkles,
    title: "Yaratıcılık",
    desc: "Fotoğrafçılık ve iletişimde güçlü anlatım",
    color: "from-violet-500 to-fuchsia-600",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
];

export function About() {
  return (
    <section id="about" className="section-container section-block">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        {/* Image Column */}
        <Reveal className="lg:col-span-5">
          <div className="relative">
            {/* Glowing halo */}
            <div className="absolute -inset-6 -z-10 rounded-[48px] bg-gradient-to-tr from-brand-bronze/35 via-brand-gold/20 to-transparent blur-3xl" />

            <div className="relative overflow-hidden rounded-[36px] border border-brand-gold/40 shadow-deep">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
                alt="Muhammed Emin Türkoğlu"
                width={900}
                height={1100}
                className="h-[560px] w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-brand-ink/10 to-transparent" />

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-5 top-5 rounded-2xl border border-white/20 bg-white/15 px-4 py-2.5 backdrop-blur"
              >
                <p className="text-xs font-semibold text-white">Bursa, Türkiye 📍</p>
              </motion.div>

              {/* Bottom card */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
                <div className="text-brand-cream">
                  <p className="text-[10px] uppercase tracking-[0.25em] opacity-75">Profesyon</p>
                  <p className="font-display text-lg">İki dünya, tek vizyon</p>
                </div>
                <Link
                  href="/hakkimda"
                  className="grid h-10 w-10 place-items-center rounded-full bg-brand-cream/90 text-brand-ink transition hover:bg-white"
                >
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Floating stat badge */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 rounded-2xl border border-brand-gold/30 bg-white/90 p-4 shadow-glass backdrop-blur dark:bg-brand-ink/80"
            >
              <p className="font-display text-3xl font-bold text-brand-ink dark:text-brand-cream">1500+</p>
              <p className="text-xs text-brand-mist">Hasta Deneyimi</p>
            </motion.div>
          </div>
        </Reveal>

        {/* Content Column */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="section-eyebrow">Hakkımda</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
              Sağlığın insan yanı, teknolojinin{" "}
              <span className="text-gradient-gold italic">yaratıcı yanı</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-brand-mist dark:text-brand-cream/80">
              Uludağ Üniversitesi&apos;nde hemşirelik eğitimi aldım. Şu anda Endoskopi biriminde aktif hemşire
              olarak görev yapıyor; Bursa merkezli çalışmalarımda insan odaklı yaklaşımı sağlık, gönüllülük
              ve sosyal sorumluluk alanlarında sürdürüyorum.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-4 text-lg leading-relaxed text-brand-mist dark:text-brand-cream/80">
              Avrupa Gönüllü Hizmeti, çocuklarla yürütülen etkinlikler ve sosyal projelerden gelen saha
              deneyimimi; iletişim gücü, ekip uyumu ve çözüm odaklı bakış açısıyla birleştiriyorum.
            </p>
          </Reveal>

          {/* Value cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={0.2 + i * 0.08}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="group relative overflow-hidden rounded-2xl border border-brand-gold/25 bg-white/80 p-5 backdrop-blur dark:bg-white/[0.05]"
                >
                  <div className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${v.color} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-25`} />
                  <div className={`mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${v.color} text-white shadow-glow`}>
                    <v.icon size={18} />
                  </div>
                  <p className="font-semibold text-brand-ink dark:text-brand-cream">{v.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-brand-mist dark:text-brand-cream/70">{v.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <Link
              href="/hakkimda"
              className="group mt-10 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 px-6 py-3 text-sm font-semibold text-brand-bronze transition-all hover:border-brand-bronze hover:bg-brand-bronze hover:text-white"
            >
              Tüm hikayemi okuyun
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
