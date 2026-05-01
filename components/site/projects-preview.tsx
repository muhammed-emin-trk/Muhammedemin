"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { motion } from "framer-motion";
import type { Project } from "@/lib/queries";

export function ProjectsPreview({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="section-container section-block">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="section-eyebrow">Seçilmiş işler</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
            Detaylara takıntılı, <span className="text-gradient-gold italic">sonuca odaklı</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link href="/projeler" className="btn-ghost text-sm">
            Tüm projeleri gör
            <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-12">
        {featured.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 0.1}
            className={i === 0 ? "md:col-span-7" : "md:col-span-5"}
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="h-full"
            >
              <Link
                href={`/projeler/${p.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/75 backdrop-blur dark:bg-white/[0.05] shadow-glass transition-shadow duration-500 hover:shadow-glow"
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
                  <Image
                    src={p.cover || ""}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/75 via-brand-ink/15 to-transparent transition-opacity duration-500 group-hover:from-brand-ink/85" />

                  {/* Tags */}
                  <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-ink backdrop-blur transition group-hover:bg-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Category badge */}
                  {p.category && (
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                        {p.category}
                      </span>
                    </div>
                  )}

                  {/* Bottom overlay content */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-brand-cream">
                    <div>
                      <p className="font-display text-xl leading-tight transition group-hover:text-brand-gold md:text-2xl">
                        {p.title}
                      </p>
                      {p.excerpt && (
                        <p className="mt-1 max-w-xs text-xs text-brand-cream/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100 line-clamp-2">
                          {p.excerpt}
                        </p>
                      )}
                    </div>
                    <motion.span
                      whileHover={{ rotate: 45 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="ml-3 flex-shrink-0 grid h-11 w-11 place-items-center rounded-full bg-brand-cream/90 text-brand-ink transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white"
                    >
                      <ArrowUpRight size={18} />
                    </motion.span>
                  </div>
                </div>

                {/* Footer bar */}
                {p.live_url && (
                  <div className="flex items-center justify-between border-t border-brand-gold/20 px-5 py-3">
                    <span className="text-xs text-brand-mist dark:text-brand-cream/50">Canlı proje</span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-brand-bronze">
                      <ExternalLink size={11} /> Görüntüle
                    </span>
                  </div>
                )}
              </Link>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
