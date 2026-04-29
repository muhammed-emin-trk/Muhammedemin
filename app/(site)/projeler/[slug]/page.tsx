import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Calendar, User, Tag } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { ContactCta } from "@/components/site/contact-cta";
import { projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  return { title: project?.title ?? "Proje" };
}

export default function Page({ params }: { params: { slug: string } }) {
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <main>
      <section className="section-container pt-36 md:pt-44">
        <Reveal>
          <Link href="/projeler" className="text-sm text-brand-bronze hover:text-brand-ink dark:hover:text-brand-cream">
            ← Tüm Projeler
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-brand-bronze">{p.category}</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-tight text-brand-ink md:text-6xl dark:text-brand-cream">
            {p.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/80">{p.description}</p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-brand-mist">
            <span className="inline-flex items-center gap-2"><Calendar size={14} /> {p.year}</span>
            <span className="inline-flex items-center gap-2"><User size={14} /> {p.role}</span>
            <span className="inline-flex items-center gap-2"><Tag size={14} /> {p.tags.join(" · ")}</span>
          </div>
        </Reveal>
      </section>

      <section className="section-container mt-12">
        <Reveal>
          <div className="overflow-hidden rounded-[32px] border border-brand-gold/30">
            <Image src={p.cover} alt={p.title} width={1600} height={1000} className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="section-container section-block">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-brand-charcoal dark:text-brand-cream/90">
          {p.content.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p dangerouslySetInnerHTML={{ __html: para }} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-container section-block">
        <Reveal>
          <Link
            href={`/projeler/${next.slug}`}
            className="group block overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/70 p-8 transition hover:-translate-y-1 hover:shadow-glass dark:bg-white/[0.04]"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Sonraki Proje</p>
            <div className="mt-3 flex items-center justify-between gap-4">
              <h3 className="font-display text-3xl text-brand-ink dark:text-brand-cream">{next.title}</h3>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-bronze text-white transition group-hover:rotate-45">
                <ArrowUpRight />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      <ContactCta />
    </main>
  );
}
