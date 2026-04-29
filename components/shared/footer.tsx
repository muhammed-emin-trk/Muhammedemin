import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const cols = [
  {
    title: "Site",
    links: [
      { href: "/", label: "Anasayfa" },
      { href: "/hakkimda", label: "Hakkımda" },
      { href: "/projeler", label: "Projeler" },
      { href: "/blog", label: "Blog" },
      { href: "/iletisim", label: "İletişim" },
    ],
  },
  {
    title: "Hizmetler",
    links: [
      { href: "/projeler", label: "Web Tasarım" },
      { href: "/projeler", label: "SEO & İçerik" },
      { href: "/projeler", label: "Marka Stratejisi" },
      { href: "/projeler", label: "Sağlık Danışmanlığı" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-brand-gold/20 bg-brand-cream/40 dark:bg-brand-ink/60">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-bronze to-brand-copper font-display text-lg font-semibold text-white shadow-glow">
                ME
              </span>
              <div>
                <p className="font-display text-2xl text-brand-ink dark:text-brand-cream">Muhammed Emin Türkoğlu</p>
                <p className="text-sm text-brand-mist">Hemşire · Geliştirici · Stratejist</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-brand-mist dark:text-brand-cream/70">
              Sağlığa şefkat, kodlara hassasiyet. Bursa&apos;dan tüm Türkiye&apos;ye, insan odaklı dijital deneyimler ve premium kişisel marka projeleri üretiyorum.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Mail, href: "mailto:hello@meturkoglu.com" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-brand-gold/40 bg-white/60 text-brand-ink transition hover:-translate-y-0.5 hover:border-brand-bronze dark:bg-white/5 dark:text-brand-cream"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="font-medium text-brand-ink dark:text-brand-cream">{col.title}</p>
              <ul className="mt-4 grid gap-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-brand-mist transition hover:text-brand-bronze dark:text-brand-cream/70">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <p className="font-medium text-brand-ink dark:text-brand-cream">İletişim</p>
            <ul className="mt-4 grid gap-3 text-sm text-brand-mist dark:text-brand-cream/70">
              <li className="flex items-center gap-2"><Mail size={14} /> hello@meturkoglu.com</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +90 555 000 00 00</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Bursa, Türkiye</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-gold/20 pt-6 text-xs text-brand-mist md:flex-row">
          <p>© {new Date().getFullYear()} Muhammed Emin Türkoğlu. Tüm hakları saklıdır.</p>
          <p>
            Tasarım & geliştirme:{" "}
            <span className="text-gradient-gold font-semibold">ME Studio</span>
          </p>
        </div>
      </div>

      <div className="overflow-hidden">
        <p className="select-none whitespace-nowrap pb-6 text-center font-display text-[18vw] font-semibold leading-none tracking-tighter text-brand-gold/10 md:text-[12vw]">
          MUHAMMED EMIN
        </p>
      </div>
    </footer>
  );
}
