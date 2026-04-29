import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Magnetic } from "@/components/shared/magnetic";
import { Reveal } from "@/components/shared/reveal";

export function ContactCta() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <div className="relative overflow-hidden rounded-[40px] border border-brand-gold/40 bg-gradient-to-br from-brand-ink via-brand-charcoal to-brand-ink p-10 text-brand-cream md:p-16">
          <div aria-hidden className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand-bronze/30 blur-3xl animate-blob" />
          <div aria-hidden className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-brand-violet/20 blur-3xl animate-blob [animation-delay:-8s]" />
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">Birlikte çalışalım</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
                Markanıza <span className="text-gradient-gold italic">ışık tutalım</span>.
              </h2>
              <p className="mt-4 max-w-md text-brand-cream/80">
                Yeni bir site, yeni bir lansman ya da mevcut yapıyı yenilemek için kısa bir görüşme yeterli.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <Magnetic>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-3 rounded-full bg-brand-cream px-7 py-4 font-medium text-brand-ink transition hover:bg-white"
                >
                  <Mail size={16} />
                  Birlikte Çalışalım
                  <ArrowRight size={16} />
                </Link>
              </Magnetic>
              <a href="mailto:muhammedeminturk.16@gmail.com" className="text-sm text-brand-cream/70 hover:text-brand-cream">
                muhammedeminturk.16@gmail.com
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
