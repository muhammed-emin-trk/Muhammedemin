import { Stethoscope, Code2, Search, PenTool, HeartPulse, Megaphone } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const skills = [
  {
    icon: Stethoscope,
    title: "Klinik Bakım",
    desc: "Hastane ortamında ileri düzey hasta takibi, kriz yönetimi ve ekip koordinasyonu.",
    span: "md:col-span-2 md:row-span-2",
    accent: "from-rose-400/30 via-rose-300/10 to-transparent",
  },
  {
    icon: Code2,
    title: "Web Geliştirme",
    desc: "Next.js, React, TypeScript, Tailwind ile modern arayüzler.",
    span: "md:col-span-2",
    accent: "from-sky-400/30 via-sky-300/10 to-transparent",
  },
  {
    icon: Search,
    title: "SEO & Performans",
    desc: "Lighthouse 95+ skorlu, arama motoru dostu yapı.",
    span: "md:col-span-2",
    accent: "from-amber-400/30 via-amber-300/10 to-transparent",
  },
  {
    icon: PenTool,
    title: "Marka Tasarımı",
    desc: "Premium hissi, sade ve hatırlanabilir görsel kimlik.",
    span: "md:col-span-2",
    accent: "from-violet-400/30 via-violet-300/10 to-transparent",
  },
  {
    icon: HeartPulse,
    title: "Sağlık Teknolojileri",
    desc: "Klinik iş akışlarına özel dijital çözümler & otomasyon.",
    span: "md:col-span-2",
    accent: "from-emerald-400/30 via-emerald-300/10 to-transparent",
  },
  {
    icon: Megaphone,
    title: "Dijital Pazarlama",
    desc: "Sosyal medya, içerik stratejisi ve dönüşüm odaklı kampanyalar.",
    span: "md:col-span-2",
    accent: "from-orange-400/30 via-orange-300/10 to-transparent",
  },
];

export function Skills() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Uzmanlık</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          İki disiplinin <span className="text-gradient-gold italic">incelikli</span> birleşimi.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/70">
          Hastanedeki disiplin ve insan ilişkisi, dijitalde ürettiğim her satır kodun, tasarladığım her arayüzün arka planında yaşar.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-6 md:auto-rows-[180px]">
        {skills.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06} className={s.span}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-glass dark:bg-white/[0.04]">
              <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${s.accent} blur-2xl opacity-70 group-hover:opacity-100 transition`} />
              <s.icon className="text-brand-bronze" size={26} />
              <p className="mt-4 font-display text-xl text-brand-ink dark:text-brand-cream">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-mist dark:text-brand-cream/70">{s.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
