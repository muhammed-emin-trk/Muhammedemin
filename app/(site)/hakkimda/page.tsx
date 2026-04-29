import { GraduationCap, Stethoscope, Code2, Sparkles, Award, Heart } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { ContactCta } from "@/components/site/contact-cta";
import { PersonalHeroPhoto, PersonalPhotosGrid } from "@/components/site/personal-photos";
import { getPhotos } from "@/lib/queries";

const timeline = [
  {
    year: "2017 — 2021",
    title: "Uludağ Üniversitesi · Hemşirelik",
    desc: "Lisans eğitimim boyunca klinik staj, gönüllü sağlık projeleri ve toplum sağlığı çalışmalarında aktif rol aldım.",
    icon: GraduationCap,
  },
  {
    year: "2021 — Bugün",
    title: "Bursa Şehir Hastanesi · Endoskopi Hemşiresi",
    desc: "Türkiye&apos;nin en büyük şehir hastanelerinden birinde Endoskopi biriminde aktif hemşirelik görevimi sürdürüyorum. Hasta odaklı, ekip çalışmasına yatkın bir profesyonel olarak gelişiyorum.",
    icon: Stethoscope,
  },
  {
    year: "2022 — Bugün",
    title: "Yazılım & Web Geliştirme",
    desc: "Next.js, React ve Tailwind ile bireyler ve markalar için premium web deneyimleri tasarlıyorum.",
    icon: Code2,
  },
  {
    year: "2023 — Bugün",
    title: "Dijital Pazarlama & Strateji",
    desc: "İçerik, SEO ve marka stratejisi çalışmalarıyla müşterilerimin organik büyümesini sağlıyorum.",
    icon: Sparkles,
  },
];

const certificates = [
  { title: "İleri Yaşam Desteği", year: 2024 },
  { title: "Yoğun Bakım Sertifikası", year: 2023 },
  { title: "Next.js Uzmanlık", year: 2024 },
  { title: "Google Analytics 4", year: 2024 },
];

export const metadata = { title: "Hakkımda" };
export const revalidate = 60;

export default async function Page() {
  const photos = await getPhotos();

  return (
    <main>
      <section className="section-container pt-36 md:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Hakkımda</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-brand-ink md:text-6xl dark:text-brand-cream">
              Şefkatle <span className="text-gradient-gold italic">üreten</span> bir hemşire,
              <br /> disiplinle yazan bir geliştirici.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-brand-mist dark:text-brand-cream/80">
              Ben Muhammed Emin Türkoğlu. Bursa&apos;da doğdum, Uludağ Üniversitesi&apos;nde hemşirelik okudum ve bugün Bursa Şehir Hastanesi Endoskopi biriminde aktif hemşire olarak görev yapıyorum.
              Hayatımın diğer yarısında ise yazılım, tasarım ve dijital pazarlama ile uğraşıyor; insan odaklı dijital deneyimler kuruyorum.
            </p>
          </Reveal>
          <PersonalHeroPhoto photos={photos} />
        </div>
      </section>

      <section className="section-container section-block">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Fotoğraflar</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-brand-ink md:text-5xl dark:text-brand-cream">Güncel Kareler</h2>
        </Reveal>
        <PersonalPhotosGrid photos={photos} />
      </section>

      <section className="section-container section-block">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Yolculuk</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-brand-ink md:text-5xl dark:text-brand-cream">Eğitim ve Kariyer</h2>
        </Reveal>

        <ol className="relative mt-12 grid gap-8 border-l-2 border-brand-gold/30 pl-8">
          {timeline.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <li className="relative">
                <span className="absolute -left-[42px] grid h-10 w-10 place-items-center rounded-full border border-brand-gold/40 bg-brand-cream text-brand-bronze shadow-glass dark:bg-brand-ink">
                  <t.icon size={16} />
                </span>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-mist">{t.year}</p>
                <h3 className="mt-1 font-display text-2xl text-brand-ink dark:text-brand-cream">{t.title}</h3>
                <p className="mt-2 max-w-2xl text-brand-mist dark:text-brand-cream/75" dangerouslySetInnerHTML={{ __html: t.desc }} />
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section-container section-block">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Sertifikalar</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-brand-ink md:text-5xl dark:text-brand-cream">Sürekli öğrenmeye inanırım</h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="glass-card flex h-full items-start gap-3 p-5">
                <Award className="text-brand-bronze" />
                <div>
                  <p className="font-medium text-brand-ink dark:text-brand-cream">{c.title}</p>
                  <p className="text-xs text-brand-mist">{c.year}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-container section-block">
        <Reveal>
          <div className="glass-card relative overflow-hidden p-10 md:p-14">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-gold/30 blur-3xl" />
            <Heart className="text-brand-bronze" />
            <p className="mt-4 max-w-3xl font-display text-2xl leading-relaxed text-brand-ink md:text-3xl dark:text-brand-cream">
              &ldquo;Bana göre kod yazmak da, hasta başında bir el tutmak da aynı şeyi yapar:
              <span className="text-gradient-gold"> insanı yalnız bırakmamak.</span>&rdquo;
            </p>
            <p className="mt-4 text-sm text-brand-mist">— Muhammed Emin Türkoğlu</p>
          </div>
        </Reveal>
      </section>

      <ContactCta />
    </main>
  );
}
