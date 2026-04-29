import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { ContactCta } from "@/components/site/contact-cta";
import { getPosts } from "@/lib/queries";

export const metadata = { title: "Blog" };
export const revalidate = 60;

export default async function Page() {
  const posts = await getPosts();
  return (
    <main>
      <section className="section-container pt-36 md:pt-44">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Blog</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-tight text-brand-ink md:text-6xl dark:text-brand-cream">
            Sağlık, kod ve <span className="text-gradient-gold italic">strateji</span>.
          </h1>
        </Reveal>
      </section>

      <section className="section-container section-block">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${p.slug}`}
                className="group block overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/70 transition hover:-translate-y-1 hover:shadow-glass dark:bg-white/[0.04]"
              >
                {p.cover && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.cover} alt={p.title} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                )}
                <div className="space-y-3 p-6">
                  <div className="flex items-center gap-3 text-xs text-brand-mist">
                    <span>{new Date(p.date).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {p.reading_minutes} dk</span>
                  </div>
                  <h3 className="font-display text-2xl text-brand-ink transition group-hover:text-brand-bronze dark:text-brand-cream">{p.title}</h3>
                  <p className="text-brand-mist dark:text-brand-cream/70">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="rounded-2xl border border-dashed border-brand-gold/40 p-12 text-center text-brand-mist">
            Henüz yazı yok.
          </p>
        )}
      </section>

      <ContactCta />
    </main>
  );
}
