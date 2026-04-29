import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Brain, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const values = [
  { icon: HeartHandshake, title: "Empati", desc: "İnsanı merkeze alan bakım anlayışı" },
  { icon: Brain, title: "Disiplin", desc: "Sahada edinilen düzenli çalışma yaklaşımı" },
  { icon: Sparkles, title: "Yaratıcılık", desc: "Fotoğrafçılık ve iletişimde güçlü anlatım" },
];

export function About() {
  return (
    <section id="about" className="section-container section-block">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-tr from-brand-bronze/30 via-brand-gold/20 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-brand-gold/40 shadow-deep">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
                alt="Sağlık & teknoloji"
                width={900}
                height={1100}
                className="h-[520px] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-brand-cream">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] opacity-80">Hakkımda</p>
                  <p className="font-display text-2xl">İki dünya, tek vizyon</p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-cream/90 text-brand-ink">
                  <ArrowUpRight />
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Hakkımda</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
              Sağlığın insan yanı, teknolojinin <span className="text-gradient-gold italic">yaratıcı yanı</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-brand-mist dark:text-brand-cream/80">
              Uludağ Üniversitesi&apos;nde hemşirelik eğitimi aldım. Bursa merkezli çalışmalarımda, insan odaklı yaklaşımı sağlık, gönüllülük ve sosyal sorumluluk alanlarında aktif olarak sürdürüyorum.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 text-lg leading-relaxed text-brand-mist dark:text-brand-cream/80">
              Avrupa Gönüllü Hizmeti, çocuklarla yürütülen etkinlikler ve sosyal projelerden gelen saha deneyimimi; iletişim gücü, ekip uyumu ve çözüm odaklı bakış açısıyla birleştiriyorum.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={0.2 + i * 0.08}>
                <div className="glass-card h-full p-5">
                  <v.icon className="text-brand-bronze" />
                  <p className="mt-4 font-medium text-brand-ink dark:text-brand-cream">{v.title}</p>
                  <p className="mt-1 text-sm text-brand-mist dark:text-brand-cream/70">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <Link href="/hakkimda" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-brand-bronze hover:text-brand-ink dark:hover:text-brand-cream">
              Daha fazlasını okuyun <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
