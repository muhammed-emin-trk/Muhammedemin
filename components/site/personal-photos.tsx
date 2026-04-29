import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";

export type PersonalPhoto = { src: string; alt: string };

const fallbackPhotos: PersonalPhoto[] = [
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", alt: "Deniz kıyısında gün batımı" },
  { src: "https://images.unsplash.com/photo-1482192597420-4817fdd7e8b9?auto=format&fit=crop&w=1200&q=80", alt: "Taş sokakta yürüyüş" },
  { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80", alt: "Şehir ve boğaz manzarası" },
  { src: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1200&q=80", alt: "Yağmur sonrası sahil" },
];

function normalize(photos: { src: string; alt: string | null }[] | undefined): PersonalPhoto[] {
  if (!photos || !photos.length) return fallbackPhotos;
  return photos.map((p) => ({ src: p.src, alt: p.alt || "Kişisel fotoğraf" }));
}

export function PersonalHeroPhoto({ photos }: { photos?: { src: string; alt: string | null }[] }) {
  const list = normalize(photos);
  const heroPhoto = list[0];
  return (
    <Reveal delay={0.15} className="lg:col-span-5">
      <div className="relative">
        <div className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-tr from-brand-bronze/30 via-brand-gold/20 to-transparent blur-2xl" />
        <Image src={heroPhoto.src} alt={heroPhoto.alt} width={800} height={1000} className="rounded-[32px] border border-brand-gold/40 object-cover shadow-deep" priority />
      </div>
    </Reveal>
  );
}

export function PersonalPhotosGrid({ photos }: { photos?: { src: string; alt: string | null }[] }) {
  const list = normalize(photos);
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {list.map((photo, i) => (
        <Reveal key={`${photo.src}-${i}`} delay={i * 0.06}>
          <div className="overflow-hidden rounded-[28px] border border-brand-gold/30 shadow-deep">
            <Image src={photo.src} alt={photo.alt} width={1200} height={1600} className="h-[520px] w-full object-cover transition duration-500 hover:scale-[1.02]" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
