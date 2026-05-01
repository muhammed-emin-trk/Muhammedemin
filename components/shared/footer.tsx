"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/projeler", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

const services = [
  { href: "/projeler", label: "Web Tasarım & Geliştirme" },
  { href: "/projeler", label: "SEO & İçerik Stratejisi" },
  { href: "/projeler", label: "Marka Kimliği" },
  { href: "/projeler", label: "Sağlık Danışmanlığı" },
  { href: "/projeler", label: "Fotoğrafçılık" },
];

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://tr.linkedin.com/in/muhammed-emin-t%C3%BCrko%C4%9Flu-82080b1ba", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/emin.trkoglu", label: "Instagram" },
  { icon: Mail, href: "mailto:muhammedeminturk.16@gmail.com", label: "Mail" },
];

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-brand-gold/20">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/60 via-brand-cream/80 to-brand-cream dark:from-brand-ink/80 dark:via-brand-ink/90 dark:to-brand-ink" />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-gradient-to-br from-brand-gold/15 to-brand-bronze/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-16 h-80 w-80 rounded-full bg-gradient-to-br from-brand-copper/15 to-brand-gold/5 blur-3xl" />

      <div className="relative section-container pt-20 pb-10">

        {/* CTA banner */}
        <div className="mb-16 overflow-hidden rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-brand-ink via-brand-ink/95 to-brand-ink/90 p-8 md:p-12 dark:border-brand-gold/20">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl text-brand-cream md:text-4xl">
                Birlikte çalışalım<span className="text-gradient-gold">.</span>
              </h3>
              <p className="mt-2 text-brand-cream/60">Projeniz için hemen iletişime geçin.</p>
            </div>
            <Link
              href="/iletisim"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-bronze to-brand-copper px-7 py-4 font-semibold text-white shadow-glow transition-all hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(184,150,98,0.6)]"
            >
              İletişime Geç
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-bronze to-brand-copper font-display text-xl font-bold text-white shadow-glow"
              >
                ME
              </motion.div>
              <div>
                <p className="font-display text-xl text-brand-ink dark:text-brand-cream">Muhammed Emin Türkoğlu</p>
                <p className="text-xs text-brand-mist">Hemşire · Gönüllü · Fotoğrafçı</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-mist dark:text-brand-cream/65">
              İnsan odaklı yaklaşım, gönüllülük ruhu ve sahadan gelen tecrübeyle; sağlık, sosyal sorumluluk ve iletişim alanlarında değer üretiyorum.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="grid h-11 w-11 place-items-center rounded-full border border-brand-gold/35 bg-white/70 text-brand-bronze shadow-glass backdrop-blur transition-colors hover:border-brand-bronze hover:bg-brand-bronze hover:text-white dark:bg-white/5 dark:text-brand-cream"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bronze">Site</p>
            <ul className="mt-5 grid gap-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-1.5 text-brand-mist transition-colors hover:text-brand-bronze dark:text-brand-cream/65 dark:hover:text-brand-gold"
                  >
                    <span className="h-px w-0 bg-brand-bronze transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bronze">Hizmetler</p>
            <ul className="mt-5 grid gap-3 text-sm">
              {services.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-1.5 text-brand-mist transition-colors hover:text-brand-bronze dark:text-brand-cream/65 dark:hover:text-brand-gold"
                  >
                    <span className="h-px w-0 bg-brand-bronze transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bronze">İletişim</p>
            <ul className="mt-5 grid gap-3.5 text-sm text-brand-mist dark:text-brand-cream/65">
              <li>
                <a href="mailto:muhammedeminturk.16@gmail.com" className="flex items-center gap-2.5 transition-colors hover:text-brand-bronze">
                  <span className="grid h-8 w-8 place-items-center rounded-xl border border-brand-gold/30 bg-white/70 backdrop-blur dark:bg-white/5">
                    <Mail size={13} />
                  </span>
                  muhammedeminturk.16@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+905462851826" className="flex items-center gap-2.5 transition-colors hover:text-brand-bronze">
                  <span className="grid h-8 w-8 place-items-center rounded-xl border border-brand-gold/30 bg-white/70 backdrop-blur dark:bg-white/5">
                    <Phone size={13} />
                  </span>
                  0546 285 18 26
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-xl border border-brand-gold/30 bg-white/70 backdrop-blur dark:bg-white/5">
                  <MapPin size={13} />
                </span>
                Osmangazi, Bursa
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-brand-gold/20 pt-6 text-xs text-brand-mist md:flex-row">
          <p>© {new Date().getFullYear()} Muhammed Emin Türkoğlu. Tüm hakları saklıdır.</p>
          <p>
            Tasarım & geliştirme:{" "}
            <span className="text-gradient-gold font-semibold">ME Studio</span>
          </p>
        </div>
      </div>

      {/* Watermark */}
      <div className="overflow-hidden">
        <p className="select-none whitespace-nowrap pb-4 text-center font-display text-[16vw] font-bold leading-none tracking-tighter text-brand-gold/8 dark:text-brand-gold/6 md:text-[11vw]">
          MUHAMMED EMIN
        </p>
      </div>
    </footer>
  );
}
