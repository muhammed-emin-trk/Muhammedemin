import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { ContactCta } from "@/components/site/contact-cta";
import { posts } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  return { title: post?.title ?? "Yazı" };
}

export default function Page({ params }: { params: { slug: string } }) {
  const idx = posts.findIndex((p) => p.slug === params.slug);
  if (idx === -1) notFound();
  const post = posts[idx];
  const next = posts[(idx + 1) % posts.length];

  return (
    <main>
      <section className="section-container pt-36 md:pt-44">
        <Reveal>
          <Link href="/blog" className="text-sm text-brand-bronze hover:text-brand-ink dark:hover:text-brand-cream">
            ← Tüm Yazılar
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-brand-mist">
            <span className="rounded-full bg-brand-gold/20 px-3 py-1 uppercase tracking-[0.2em] text-brand-bronze">Blog</span>
            <span>{new Date(post.date).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })}</span>
            <span className="inline-flex items-center gap-1"><Clock size={12} /> {post.readingMinutes} dk</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-tight text-brand-ink md:text-6xl dark:text-brand-cream">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/80">{post.excerpt}</p>
        </Reveal>
      </section>

      <section className="section-container mt-12">
        <Reveal>
          <div className="overflow-hidden rounded-[32px] border border-brand-gold/30">
            <Image src={post.cover} alt={post.title} width={1600} height={900} className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </section>

      <article className="section-container section-block">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-brand-charcoal dark:text-brand-cream/90">
          {post.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p dangerouslySetInnerHTML={{ __html: para }} />
            </Reveal>
          ))}
        </div>
      </article>

      <section className="section-container section-block">
        <Reveal>
          <Link
            href={`/blog/${next.slug}`}
            className="group block overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/70 p-8 transition hover:-translate-y-1 hover:shadow-glass dark:bg-white/[0.04]"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Sonraki Yazı</p>
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
