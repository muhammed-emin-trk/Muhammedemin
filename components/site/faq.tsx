"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/shared/reveal";

type F = { id: number; question: string; answer: string | null };

export function Faq({ items }: { items: F[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items?.length) return null;
  return (
    <section className="section-container section-block">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">SSS</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
              Sıkça sorulan <span className="text-gradient-gold italic">sorular</span>.
            </h2>
            <p className="mt-4 text-lg text-brand-mist dark:text-brand-cream/70">
              Çalışma sürecimiz, sürelerimiz ve teslim sonrası destek hakkında net cevaplar.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <ul className="divide-y divide-brand-gold/20 rounded-3xl border border-brand-gold/30 bg-white/70 backdrop-blur dark:bg-white/[0.04]">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-brand-ink dark:text-brand-cream">{item.question}</span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand-gold/40 transition ${
                        isOpen ? "rotate-45 bg-brand-bronze text-white" : "text-brand-bronze"
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-brand-mist dark:text-brand-cream/75">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
