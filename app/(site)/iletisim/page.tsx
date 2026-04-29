import { Mail, Phone, MapPin, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { getSettings } from "@/lib/queries";

export const metadata = { title: "İletişim" };
export const revalidate = 60;

export default async function Page() {
  const s = await getSettings();

  const channels = [
    s.email && { icon: Mail, label: "E-posta", value: s.email, href: `mailto:${s.email}` },
    s.phone && { icon: Phone, label: "Telefon", value: s.phone, href: `tel:${s.phone.replace(/\s/g, "")}` },
    s.whatsapp && { icon: MessageCircle, label: "WhatsApp", value: "Hemen yaz", href: s.whatsapp },
    s.location && { icon: MapPin, label: "Konum", value: s.location, href: "#" },
  ].filter(Boolean) as { icon: any; label: string; value: string; href: string }[];

  const socials = [
    s.github && { icon: Github, href: s.github },
    s.linkedin && { icon: Linkedin, href: s.linkedin },
    s.instagram && { icon: Instagram, href: s.instagram },
  ].filter(Boolean) as { icon: any; href: string }[];

  return (
    <main>
      <section className="section-container pt-36 md:pt-44">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">İletişim</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold leading-tight text-brand-ink md:text-6xl dark:text-brand-cream">
            Birlikte <span className="text-gradient-gold italic">değer</span> üretelim.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/80">
            Yeni bir proje, ortaklık veya sadece bir merhaba için form yeterli. 24 saat içinde dönüş yapıyorum.
          </p>
        </Reveal>
      </section>

      <section className="section-container section-block">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="glass-card p-6 md:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <div className="grid gap-4 lg:col-span-5">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <a
                  href={c.href}
                  className="glass-card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-glass"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-cream text-brand-bronze ring-1 ring-brand-gold/30 dark:bg-white/5">
                    <c.icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-mist">{c.label}</p>
                    <p className="font-medium text-brand-ink dark:text-brand-cream">{c.value}</p>
                  </div>
                </a>
              </Reveal>
            ))}
            {socials.length > 0 && (
              <Reveal delay={0.3}>
                <div className="glass-card p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-mist">Sosyal Medya</p>
                  <div className="mt-3 flex gap-3">
                    {socials.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-11 w-11 place-items-center rounded-full border border-brand-gold/40 text-brand-bronze transition hover:-translate-y-0.5 hover:bg-brand-bronze hover:text-white"
                      >
                        <s.icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
