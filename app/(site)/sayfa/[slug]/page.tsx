import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/shared/reveal";
import { ContactCta } from "@/components/site/contact-cta";
import { getPageBySlug, getPages } from "@/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = await getPageBySlug(params.slug);
  return { title: p?.title ?? "Sayfa" };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const p = await getPageBySlug(params.slug);
  if (!p) notFound();

  return (
    <main>
      <section className="section-container pt-36 md:pt-44">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Sayfa</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-tight text-brand-ink md:text-6xl dark:text-brand-cream">
            {p.title}
          </h1>
          {p.subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/80">{p.subtitle}</p>
          )}
        </Reveal>
      </section>

      {p.cover && (
        <section className="section-container mt-12">
          <Reveal>
            <div className="overflow-hidden rounded-[32px] border border-brand-gold/30">
              <Image src={p.cover} alt={p.title} width={1600} height={900} priority className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </section>
      )}

      <article className="section-container section-block">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-brand-charcoal dark:text-brand-cream/90">
          {p.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p dangerouslySetInnerHTML={{ __html: para }} />
            </Reveal>
          ))}
        </div>
      </article>

      <ContactCta />
    </main>
  );
}
