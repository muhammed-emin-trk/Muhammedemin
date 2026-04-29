import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import type { Project } from "@/lib/queries";

export function ProjectsPreview({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  if (featured.length === 0) return null;
  return (
    <section className="section-container section-block">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Seçilmiş işler</p>
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

      <div className="mt-12 grid gap-6 md:grid-cols-12">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1} className={i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}>
            <Link
              href={`/projeler/${p.slug}`}
              className="group relative block h-full overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/70 dark:bg-white/[0.04]"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={p.cover || ""}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/10 to-transparent" />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-brand-ink backdrop-blur">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-brand-cream">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] opacity-80">{p.category}</p>
                    <p className="mt-1 font-display text-2xl">{p.title}</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-cream/90 text-brand-ink transition group-hover:rotate-45">
                    <ArrowUpRight />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
