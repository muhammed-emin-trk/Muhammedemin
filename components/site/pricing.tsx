"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";

const plans = [
  {
    icon: Zap,
    name: "Starter",
    subtitle: "Hızlı başlangıç",
    price: "₺4.900",
    period: "tek seferlik",
    color: "from-sky-400 to-blue-600",
    border: "border-sky-400/30",
    glow: "rgba(14,165,233,0.2)",
    features: [
      "5 sayfalık modern web sitesi",
      "Mobil uyumlu tasarım",
      "Temel SEO ayarları",
      "İletişim formu",
      "1 revizyon hakkı",
      "30 gün destek",
    ],
    cta: "Başlayalım",
    featured: false,
  },
  {
    icon: Crown,
    name: "Premium",
    subtitle: "En çok tercih edilen",
    price: "₺9.900",
    period: "tek seferlik",
    color: "from-brand-bronze to-brand-copper",
    border: "border-brand-bronze/50",
    glow: "rgba(184,150,98,0.3)",
    features: [
      "10 sayfalık premium web sitesi",
      "Animasyonlu & premium tasarım",
      "Gelişmiş SEO + Blog sistemi",
      "Admin panel (içerik yönetimi)",
      "Özel e-posta & iletişim",
      "3 revizyon hakkı",
      "3 ay destek & bakım",
    ],
    cta: "Hemen Başla",
    featured: true,
  },
  {
    icon: Sparkles,
    name: "Enterprise",
    subtitle: "Kurumsal çözüm",
    price: "Teklif Al",
    period: "proje bazlı",
    color: "from-violet-500 to-fuchsia-600",
    border: "border-violet-400/30",
    glow: "rgba(139,92,246,0.2)",
    features: [
      "Sınırsız sayfa",
      "Özel yazılım geliştirme",
      "Veritabanı & API entegrasyonu",
      "Performans & güvenlik auditi",
      "Öncelikli destek",
      "Sınırsız revizyon",
      "12 ay destek & SLA",
    ],
    cta: "İletişime Geç",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="section-eyebrow">Paketler</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          Şeffaf fiyatlar, <span className="text-gradient-gold italic">net değer</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/70">
          Bütçenize ve hedefinize en uygun paketi seçin. Sürpriz ücret yok.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.09}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/80 p-8 backdrop-blur dark:bg-white/[0.05] ${p.border} ${
                p.featured
                  ? "ring-2 ring-brand-bronze/40 shadow-[0_8px_60px_-16px_rgba(184,150,98,0.35)]"
                  : ""
              }`}
            >
              {/* Glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl transition-opacity duration-500 opacity-20 group-hover:opacity-40"
                style={{ background: `radial-gradient(circle, ${p.glow}, transparent)` }}
              />

              {/* Top bar */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${p.color}`} />

              {/* Featured badge */}
              {p.featured && (
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-bronze to-brand-copper px-3 py-1 text-[11px] font-bold text-white shadow-glow">
                  <Crown size={10} /> Önerilen
                </div>
              )}

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 8 }}
                className={`inline-grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-glow`}
                style={{ height: 52, width: 52 }}
              >
                <p.icon size={22} />
              </motion.div>

              {/* Name */}
              <div className="mt-5">
                <p className="font-display text-xl text-brand-ink dark:text-brand-cream">{p.name}</p>
                <p className="mt-0.5 text-xs text-brand-mist dark:text-brand-cream/50">{p.subtitle}</p>
              </div>

              {/* Price */}
              <div className="mt-5 flex items-end gap-2">
                <span
                  className="font-display text-4xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, #b89662, #c8a96e)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {p.price}
                </span>
                <span className="mb-1 text-xs text-brand-mist dark:text-brand-cream/50">{p.period}</span>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

              {/* Features */}
              <ul className="flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className={`mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br ${p.color} text-white`}>
                      <Check size={11} />
                    </span>
                    <span className="text-brand-charcoal dark:text-brand-cream/80">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/iletisim"
                className={`group/cta mt-8 flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-all ${
                  p.featured
                    ? `bg-gradient-to-r ${p.color} text-white shadow-glow hover:opacity-90 hover:shadow-[0_10px_40px_-10px_rgba(184,150,98,0.5)]`
                    : "border border-brand-gold/40 text-brand-bronze hover:border-brand-bronze hover:bg-brand-bronze hover:text-white"
                }`}
              >
                {p.cta}
                <ArrowUpRight size={14} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Link>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <p className="mt-8 text-center text-sm text-brand-mist dark:text-brand-cream/50">
          Tüm paketlerde %100 müşteri memnuniyeti garantisi verilir.
          Sorularınız için <Link href="/iletisim" className="text-brand-bronze hover:underline">iletişime geçin</Link>.
        </p>
      </Reveal>
    </section>
  );
}
