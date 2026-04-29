import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import type { Post } from "@/lib/queries";

export function BlogPreview({ posts }: { posts: Post[] }) {
  const latest = posts.slice(0, 3);
  if (latest.length === 0) return null;
  return (
    <section className="section-container section-block">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Yazılar</p>
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
            <Link
              href={`/blog/${p.slug}`}
              className="group block h-full overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/70 transition hover:-translate-y-1 hover:shadow-glass dark:bg-white/[0.04]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.cover || ""}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-center gap-3 text-xs text-brand-mist">
                  <span>{new Date(p.date).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {p.reading_minutes} dk</span>
                </div>
                <h3 className="font-display text-xl text-brand-ink transition group-hover:text-brand-bronze dark:text-brand-cream">{p.title}</h3>
                <p className="text-sm text-brand-mist dark:text-brand-cream/70">{p.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
