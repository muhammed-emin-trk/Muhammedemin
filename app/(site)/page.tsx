import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

const counters = ["1.500+ hasta bakımı", "30+ dijital proje", "5+ yıl deneyim", "%98 müşteri memnuniyeti"];

export default function SiteHome() {
  return (
    <div>
      <Navbar />
      <main>
        <section className="section-container section-block">
          <p className="mb-4 text-sm text-brand-mint">● Bursa, Türkiye — Yeni projelere açık</p>
          <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium tracking-tight">Sağlığa şefkat, kodlara hassasiyet.</h1>
          <p className="mt-4 max-w-3xl text-xl text-white/75">Muhammed Emin Türkoğlu — Hemşire, Yazılım Geliştirici ve Dijital Stratejist.</p>
        </section>
        <section className="section-container grid gap-4 pb-20 md:grid-cols-4">{counters.map((c)=><div className="glass-card p-5" key={c}>{c}</div>)}</section>
      </main>
      <Footer />
    </div>
  );
}
