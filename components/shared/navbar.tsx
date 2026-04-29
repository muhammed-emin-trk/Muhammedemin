"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/projeler", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";
  return (
    <button
      aria-label="Tema değiştir"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-10 w-10 place-items-center rounded-full border border-brand-gold/40 bg-white/60 text-brand-ink transition hover:bg-white dark:bg-white/5 dark:text-brand-cream"
    >
      {mounted ? (isDark ? <Sun size={16} /> : <Moon size={16} />) : <span className="h-4 w-4" />}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="section-container">
          <div
            className={`flex items-center justify-between rounded-full border px-4 py-2 transition-all duration-500 ${
              scrolled
                ? "border-brand-gold/30 bg-white/80 shadow-glass backdrop-blur-xl dark:bg-brand-ink/70"
                : "border-transparent bg-transparent"
            }`}
          >
            <Link href="/" className="flex items-center gap-2 px-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-bronze to-brand-copper font-display text-sm font-semibold text-white shadow-glow">
                ME
              </span>
              <span className="hidden text-sm font-medium tracking-wide text-brand-ink sm:block dark:text-brand-cream">
                Muhammed Emin Türkoğlu
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`relative rounded-full px-4 py-2 text-sm transition ${
                      active
                        ? "text-brand-ink dark:text-brand-cream"
                        : "text-brand-mist hover:text-brand-ink dark:text-brand-cream/70 dark:hover:text-brand-cream"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-brand-gold/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeButton />
              <Link
                href="/iletisim"
                className="hidden rounded-full bg-brand-ink px-4 py-2 text-sm font-medium text-brand-cream transition hover:bg-brand-charcoal md:inline-flex dark:bg-brand-cream dark:text-brand-ink"
              >
                Çalışalım
              </Link>
              <button
                onClick={() => setOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-gold/40 bg-white/60 md:hidden dark:bg-white/5"
                aria-label="Menüyü aç"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative mx-6 mt-24 rounded-3xl border border-brand-gold/40 bg-brand-cream p-6 shadow-deep dark:bg-brand-ink"
            >
              <ul className="grid gap-2">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { delay: i * 0.05 } }}
                  >
                    <Link
                      href={l.href}
                      className="block rounded-2xl px-4 py-3 text-lg font-medium text-brand-ink hover:bg-brand-gold/20 dark:text-brand-cream"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/iletisim"
                className="mt-4 grid place-items-center rounded-full bg-brand-ink py-3 font-medium text-brand-cream dark:bg-brand-cream dark:text-brand-ink"
              >
                Birlikte Çalışalım
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
