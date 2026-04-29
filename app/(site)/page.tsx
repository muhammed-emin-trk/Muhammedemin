import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

const counters = ["1.500+ hasta bakımı", "30+ dijital proje", "5+ yıl deneyim", "%98 müşteri memnuniyeti"];

const gallery = [
  { src: "/images/emin-1.jpg", alt: "Boğaz manzarasında portre" },
  { src: "/images/emin-2.jpg", alt: "Tarihi sokakta çekilen portre" },
  { src: "/images/emin-3.jpg", alt: "Deniz kenarında çekilen portre" },
  { src: "/images/emin-4.jpg", alt: "Yağmurlu havada şemsiye ile portre" },
  { src: "/images/emin-5.jpg", alt: "Galata manzaralı portre" },
];

export default function SiteHome() {
  return (
    <div>
      <Navbar />
      <main>
        <section className="section-container section-block">
          <p className="mb-4 text-sm text-brand-gold">● Bursa, Türkiye — Yeni projelere açık</p>
          <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium tracking-tight text-brand-ink">Sağlığa şefkat, kodlara hassasiyet.</h1>
          <p className="mt-4 max-w-3xl text-xl text-brand-ink/75">Muhammed Emin Türkoğlu — Hemşire, Yazılım Geliştirici ve Dijital Stratejist.</p>
        </section>

        <section className="section-container grid gap-4 pb-20 md:grid-cols-4">
          {counters.map((c) => (
            <div className="glass-card p-5" key={c}>
              {c}
            </div>
          ))}
        </section>

        <section className="section-container pb-24">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-brand-gold">Galeri</p>
              <h2 className="mt-2 text-3xl font-medium text-brand-ink">Sade ve şık fotoğraf alanı</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
            {gallery.map((photo, index) => (
              <article
                className={`overflow-hidden rounded-2xl border border-brand-gold/30 bg-white shadow-sm ${
                  index === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"
                }`}
                key={photo.src}
              >
                <Image alt={photo.alt} className="h-full w-full object-cover" height={1200} src={photo.src} width={900} />
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
