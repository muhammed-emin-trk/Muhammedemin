import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { ContactCta } from "@/components/site/contact-cta";
import { projects } from "@/lib/content";

export const metadata = { title: "Projeler" };

export default function Page() {
  return (
    <main>
      <section className="section-container pt-36 md:pt-44">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Çalışmalar</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-tight text-brand-ink md:text-6xl dark:text-brand-cream">
            Detaylara takıntılı, <span className="text-gradient-gold italic">sonuç odaklı</span> projeler.
          </h1>
        </Reveal>
      </section>

      <section className="section-container section-block">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                href={`/projeler/${p.slug}`}
                className="group block overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/70 transition hover:-translate-y-1 hover:shadow-glass dark:bg-white/[0.04]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-white/85 px-3 py-1 text-xs text-brand-ink">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-mist">
                      {p.category} · {p.year}
                    </p>
                    <h3 className="mt-1 font-display text-2xl text-brand-ink transition group-hover:text-brand-bronze dark:text-brand-cream">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-brand-mist dark:text-brand-cream/70">{p.description}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-gold/40 text-brand-bronze transition group-hover:rotate-45 group-hover:bg-brand-bronze group-hover:text-white">
                    <ArrowUpRight />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
