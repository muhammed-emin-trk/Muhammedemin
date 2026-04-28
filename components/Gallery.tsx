"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ADMIN_STORAGE_KEY, defaultGalleryItems, type GalleryItem } from "@/lib/siteContent";

const parseGallery = (rawValue: string | null): GalleryItem[] => {
  if (!rawValue) {
    return defaultGalleryItems;
  }

  try {
    const parsed = JSON.parse(rawValue) as GalleryItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultGalleryItems;
    }

    return parsed.map((item, index) => ({
      id: item.id || `item-${index}`,
      title: item.title || "Başlık",
      subtitle: item.subtitle || "Açıklama",
      imageUrl: item.imageUrl || defaultGalleryItems[index % defaultGalleryItems.length].imageUrl,
    }));
  } catch {
    return defaultGalleryItems;
  }
};

export default function Gallery() {
  const [cards, setCards] = useState<GalleryItem[]>(defaultGalleryItems);

  useEffect(() => {
    setCards(parseGallery(window.localStorage.getItem(ADMIN_STORAGE_KEY)));

    const onStorage = () => {
      setCards(parseGallery(window.localStorage.getItem(ADMIN_STORAGE_KEY)));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <section id="galeri" className="py-20">
      <div className="section-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold sm:text-3xl">Vitrin / Örnek Çalışma Alanları</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Fotoğraflar artık admin panelden güncellenebilir. Görsel yüklenmezse kart yine metinle görünür.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group relative min-h-72 overflow-hidden rounded-3xl border border-white/30 shadow-glass"
            >
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <div className="relative mt-auto flex h-full flex-col justify-end p-5 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">Showcase</p>
                <h4 className="mt-2 text-xl font-semibold">{card.title}</h4>
                <p className="mt-2 text-sm text-white/90">{card.subtitle}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
