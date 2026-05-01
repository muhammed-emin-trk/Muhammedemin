"use client";

import { motion } from "framer-motion";
import { Code2, TrendingUp, HeartPulse, ArrowUpRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";

const services = [
  {
    icon: Code2,
    title: "Web Sitesi Tasarımı & Geliştirme",
    desc: "Next.js ve Tailwind ile premium hisli, hızlı ve dönüşüm odaklı kurumsal & kişisel siteler.",
    items: ["Next.js 14 App Router", "Animasyonlu UI", "SEO optimizasyonu", "Mobil öncelikli tasarım"],
    color: "from-sky-400 to-blue-600",
    glow: "rgba(14,165,233,0.25)",
    badge: "En Popüler",
    featured: true,
  },
  {
    icon: TrendingUp,
    title: "Dijital Pazarlama & SEO",
    desc: "Google'da görünürlüğünüzü artıran içerik stratejisi, teknik SEO ve sosyal medya yönetimi.",
    items: ["Anahtar kelime stratejisi", "İçerik takvimi", "Performans analizi", "Rakip analizi"],
    color: "from-amber-400 to-orange-600",
    glow: "rgba(245,158,11,0.25)",
    badge: null,
    featured: false,
  },
  {
    icon: HeartPulse,
    title: "Sağlık Sektörüne Özel Çözümler",
    desc: "Klinik, doktor ve sağlık profesyonelleri için randevu, içerik ve marka altyapıları.",
    items: ["Randevu sayfaları", "Hasta odaklı içerik", "KVKK uyumu", "Medikal SEO"],
    color: "from-rose-400 to-pink-600",
    glow: "rgba(244,63,94,0.25)",
    badge: "Uzmanlık",
    featured: false,
  },
];

export function Services() {
  return (
    <section id="services" className="section-container section-block">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="section-eyebrow">Hizmetler</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
            Markanıza <span className="text-gradient-gold italic">premium bir dokunuş</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/70">
            Her hizmet, uzun vadeli değer yaratmak için özel olarak tasarlandı.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.09}>
            <motion.article
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 270, damping: 20 }}
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/80 p-8 backdrop-blur dark:bg-white/[0.05] ${
                s.featured
                  ? "border-brand-bronze/50 shadow-[0_4px_40px_-8px_rgba(184,150,98,0.25)]"
                  : "border-brand-gold/30"
              }`}
            >
              {/* Gradient top bar */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color} transition-all duration-500 group-hover:h-1.5`} />

              {/* Background glow blob */}
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${s.color} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
              />

              {/* Badge */}
              {s.badge && (
                <span
                  className={`absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide bg-gradient-to-r ${s.color} text-white shadow-glow`}
                >
                  <Sparkles size={10} />
                  {s.badge}
                </span>
              )}

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-glow`}
              >
                <s.icon size={24} />
              </motion.div>

              {/* Title */}
              <h3 className="mt-5 font-display text-xl leading-snug text-brand-ink dark:text-brand-cream">{s.title}</h3>

              {/* Description */}
              <p
                className="mt-3 text-sm leading-relaxed text-brand-mist dark:text-brand-cream/70"
                dangerouslySetInnerHTML={{ __html: s.desc }}
              />

              {/* Divider */}
              <div className="my-5 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

              {/* Feature list */}
              <ul className="grid flex-1 gap-2.5 text-sm text-brand-charcoal dark:text-brand-cream/85">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2.5">
                    <span className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br ${s.color} text-white`}>
                      <Check size={11} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/iletisim"
                className={`group/link mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  s.featured
                    ? `bg-gradient-to-r ${s.color} text-white shadow-glow hover:opacity-90`
                    : "border border-brand-gold/40 text-brand-bronze hover:border-brand-bronze hover:bg-brand-bronze hover:text-white"
                }`}
              >
                Teklif al
                <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
