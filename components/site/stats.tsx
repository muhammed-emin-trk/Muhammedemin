import { HeartPulse, Code2, GraduationCap, Smile } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Counter } from "@/components/shared/counter";

const stats = [
  { icon: HeartPulse, label: "Hasta bakımı", value: 1500, suffix: "+", tone: "from-rose-500/20 to-rose-300/10" },
  { icon: Code2, label: "Dijital proje", value: 30, suffix: "+", tone: "from-sky-500/20 to-sky-300/10" },
  { icon: GraduationCap, label: "Yıl deneyim", value: 5, suffix: "+", tone: "from-amber-500/20 to-amber-300/10" },
  { icon: Smile, label: "Müşteri memnuniyeti", value: 98, suffix: "%", tone: "from-emerald-500/20 to-emerald-300/10" },
];

export function Stats() {
  return (
    <section className="section-container -mt-6">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className={`glass-card relative overflow-hidden p-6`}>
              <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.tone} blur-2xl`} />
              <s.icon className="text-brand-bronze" size={22} />
              <p className="mt-4 font-display text-4xl font-semibold text-brand-ink dark:text-brand-cream">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-brand-mist dark:text-brand-cream/70">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
