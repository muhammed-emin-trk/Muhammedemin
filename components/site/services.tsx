"use client";

import { motion } from "framer-motion";
import { Code2, TrendingUp, HeartPulse, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";

const services = [
  {
    icon: Code2,
    title: "Web Sitesi Tasarımı & Geliştirme",
    desc: "Next.js ve Tailwind ile premium hisli, hızlı ve dönüşüm odaklı kurumsal & kişisel siteler.",
    items: ["Next.js 14 App Router", "Animasyonlu UI", "SEO optimizasyonu"],
    color: "from-sky-400 to-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Dijital Pazarlama & SEO",
    desc: "Google&apos;da görünürlüğünüzü artıran içerik stratejisi, teknik SEO ve sosyal medya yönetimi.",
    items: ["Anahtar kelime stratejisi", "İçerik takvimi", "Performans analizi"],
    color: "from-amber-400 to-orange-600",
  },
  {
    icon: HeartPulse,
    title: "Sağlık Sektörüne Özel Çözümler",
    desc: "Klinik, doktor ve sağlık profesyonelleri için randevu, içerik ve marka altyapıları.",
    items: ["Randevu sayfaları", "Hasta odaklı içerik", "KVKK uyumu"],
    color: "from-rose-400 to-pink-600",
  },
];

export function Services() {
  return (
    <section id="services" className="section-container section-block">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Hizmetler</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          Markanıza <span className="text-gradient-gold italic">premium bir dokunuş</span>.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/80 p-7 backdrop-blur dark:bg-white/[0.04]"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color} opacity-80`} />
              <div className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-br ${s.color} opacity-10 blur-3xl transition group-hover:opacity-25`} />
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-cream text-brand-bronze ring-1 ring-brand-gold/40 dark:bg-white/5">
                <s.icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-xl text-brand-ink dark:text-brand-cream">{s.title}</h3>
              <p
                className="mt-2 text-sm leading-relaxed text-brand-mist dark:text-brand-cream/70"
                dangerouslySetInnerHTML={{ __html: s.desc }}
              />
              <ul className="mt-5 grid gap-2 text-sm text-brand-charcoal dark:text-brand-cream/85">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <Check size={14} className="text-brand-bronze" />
                    {it}
                  </li>
                ))}
              </ul>
              <Link
                href="/iletisim"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-brand-bronze transition hover:text-brand-ink dark:hover:text-brand-cream"
              >
                Teklif al <ArrowUpRight size={14} />
              </Link>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
