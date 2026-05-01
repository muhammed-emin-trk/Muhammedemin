import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Magnetic } from "@/components/shared/magnetic";
import { Reveal } from "@/components/shared/reveal";

export function ContactCta() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <div className="relative overflow-hidden rounded-[44px] border border-brand-gold/35 bg-gradient-to-br from-brand-ink via-[#241d12] to-brand-ink p-10 text-brand-cream shadow-deep md:p-16">
          {/* Animated blobs */}
          <div aria-hidden className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-bronze/35 blur-3xl animate-blob" />
          <div aria-hidden className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-brand-violet/25 blur-3xl animate-blob [animation-delay:-8s]" />
          <div aria-hidden className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-copper/15 blur-3xl animate-blob [animation-delay:-4s]" />

          {/* Dot pattern overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">
                <Sparkles size={12} />
                Birlikte çalışalım
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
                Markanıza{" "}
                <span className="text-gradient-gold italic">ışık tutalım</span>.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-cream/75">
                Yeni bir site, yeni bir lansman ya da mevcut yapıyı yenilemek için kısa bir görüşme yeterli.
              </p>
            </div>
            <div className="flex flex-col gap-5 md:items-end">
              <Magnetic>
                <Link
                  href="/iletisim"
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-cream px-8 py-4 font-semibold text-brand-ink shadow-glow transition-all hover:bg-white hover:shadow-[0_20px_50px_-10px_rgba(248,242,232,0.4)] hover:-translate-y-1"
                >
                  <Mail size={17} />
                  Birlikte Çalışalım
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <a
                href="mailto:muhammedeminturk.16@gmail.com"
                className="text-sm text-brand-cream/60 transition hover:text-brand-gold"
              >
                muhammedeminturk.16@gmail.com
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
