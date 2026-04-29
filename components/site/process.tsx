import { Compass, Layers, Code2, Rocket } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const steps = [
  { icon: Compass, title: "Keşif", desc: "Hedef kitlenizi, marka tonunuzu ve hedeflerinizi birlikte netleştiriyoruz." },
  { icon: Layers, title: "Strateji & Tasarım", desc: "Bilgi mimarisi, kullanıcı akışı ve premium görsel dil oluşturuyoruz." },
  { icon: Code2, title: "Geliştirme", desc: "Performans, erişilebilirlik ve SEO odaklı kod ile ürünü hayata geçiriyoruz." },
  { icon: Rocket, title: "Lansman & Büyüme", desc: "Yayına alıyor, ölçüyor, iyileştiriyor; markanızı sürekli ileri taşıyoruz." },
];

export function Process() {
  return (
    <section className="section-container section-block">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Çalışma süreci</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl dark:text-brand-cream">
          Şeffaf, hızlı ve <span className="text-gradient-gold italic">odaklanmış</span>.
        </h2>
      </Reveal>

      <div className="relative mt-14 grid gap-6 md:grid-cols-4">
        <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent md:block" />
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="relative">
              <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-brand-gold/40 bg-brand-cream text-brand-bronze shadow-glass dark:bg-brand-ink">
                <s.icon size={20} />
              </div>
              <p className="mt-5 font-display text-xl text-brand-ink dark:text-brand-cream">
                <span className="mr-2 text-sm tabular-nums text-brand-mist">0{i + 1}</span>
                {s.title}
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-mist dark:text-brand-cream/70">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
