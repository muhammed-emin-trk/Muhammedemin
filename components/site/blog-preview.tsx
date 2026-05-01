"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/reveal";
import type { Post } from "@/lib/queries";

export function BlogPreview({ posts }: { posts: Post[] }) {
  const latest = posts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="section-container section-block">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="section-eyebrow">Yazılar</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
            Sağlık, kod ve <span className="text-gradient-gold italic">strateji</span> üzerine notlar.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link href="/blog" className="btn-ghost text-sm">
            Tüm yazılar
            <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {latest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="h-full"
            >
              <Link
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/75 backdrop-blur dark:bg-white/[0.05] shadow-glass hover:shadow-glow transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.cover || ""}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Tags overlay */}
                  {p.tags.length > 0 && (
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-brand-ink backdrop-blur">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col space-y-3 p-6">
                  <div className="flex items-center gap-3 text-xs text-brand-mist dark:text-brand-cream/50">
                    <span>
                      {new Date(p.date).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {p.reading_minutes} dk okuma
                    </span>
                  </div>
                  <h3 className="font-display text-xl leading-snug text-brand-ink transition-colors group-hover:text-brand-bronze dark:text-brand-cream dark:group-hover:text-brand-gold">
                    {p.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-brand-mist dark:text-brand-cream/65 line-clamp-3">
                    {p.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-bronze transition-colors group-hover:text-brand-ink dark:group-hover:text-brand-cream">
                    Okumaya devam et
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
