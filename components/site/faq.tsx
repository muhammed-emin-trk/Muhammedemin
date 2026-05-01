"use client";

import { useState } from "react";
import { Plus, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/shared/reveal";
import Link from "next/link";

type F = { id: number; question: string; answer: string | null };

export function Faq({ items }: { items: F[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items?.length) return null;

  return (
    <section className="section-container section-block">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Left sticky column */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="section-eyebrow">SSS</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
              Sıkça sorulan <span className="text-gradient-gold italic">sorular</span>.
            </h2>
            <p className="mt-4 text-lg text-brand-mist dark:text-brand-cream/70">
              Çalışma sürecimiz, sürelerimiz ve teslim sonrası destek hakkında net cevaplar.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 overflow-hidden rounded-3xl border border-brand-gold/25 bg-white/80 p-6 backdrop-blur dark:bg-white/[0.05]">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-bronze to-brand-copper text-white shadow-glow">
                  <MessageCircleQuestion size={20} />
                </span>
                <div>
                  <p className="font-semibold text-brand-ink dark:text-brand-cream">Sorunuz mu var?</p>
                  <p className="text-xs text-brand-mist">Hepsini sormaktan çekinmeyin.</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-brand-mist dark:text-brand-cream/65">
                Burada cevabını bulamadığınız sorularınız için doğrudan iletişime geçebilirsiniz.
              </p>
              <Link
                href="/iletisim"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-2.5 text-sm font-semibold text-brand-cream transition hover:bg-brand-bronze dark:bg-brand-cream dark:text-brand-ink dark:hover:bg-brand-gold"
              >
                İletişime Geç
              </Link>
            </div>
          </Reveal>
        </div>

        {/* FAQ accordion */}
        <div className="lg:col-span-7">
          <ul className="space-y-3">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.id} delay={i * 0.05}>
                  <li
                    className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                      isOpen
                        ? "border-brand-bronze/40 bg-white/90 dark:bg-white/[0.08]"
                        : "border-brand-gold/25 bg-white/70 dark:bg-white/[0.04]"
                    } backdrop-blur`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex-shrink-0 text-xs font-bold tabular-nums transition-colors ${
                            isOpen ? "text-brand-bronze" : "text-brand-gold/60"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`font-semibold transition-colors ${isOpen ? "text-brand-ink dark:text-brand-cream" : "text-brand-ink/80 dark:text-brand-cream/80"}`}>
                          {item.question}
                        </span>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border transition-colors ${
                          isOpen
                            ? "border-brand-bronze bg-brand-bronze text-white"
                            : "border-brand-gold/40 text-brand-bronze"
                        }`}
                      >
                        <Plus size={16} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="h-px bg-gradient-to-r from-brand-gold/30 to-transparent mb-4" />
                            <p className="text-sm leading-relaxed text-brand-mist dark:text-brand-cream/75">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
