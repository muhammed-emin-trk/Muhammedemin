"use client";

import { useEffect, useState } from "react";
import { PERSONAL_PHOTOS_KEY, type PersonalPhoto } from "@/components/site/personal-photos";

const emptySlot = (): PersonalPhoto => ({ src: "", alt: "" });

export default function AdminPage() {
  const [photos, setPhotos] = useState<PersonalPhoto[]>([emptySlot(), emptySlot(), emptySlot(), emptySlot()]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(PERSONAL_PHOTOS_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const normalized = [...parsed, emptySlot(), emptySlot(), emptySlot(), emptySlot()].slice(0, 4);
        setPhotos(normalized);
      }
    } catch {}
  }, []);

  const onFileChange = (index: number, file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = typeof reader.result === "string" ? reader.result : "";
      setPhotos((prev) => prev.map((p, i) => (i === index ? { ...p, src } : p)));
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    const filtered = photos.filter((p) => p.src.trim().length > 0).map((p) => ({ src: p.src, alt: p.alt || "Kişisel fotoğraf" }));
    localStorage.setItem(PERSONAL_PHOTOS_KEY, JSON.stringify(filtered));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <main className="section-container pt-36 pb-20">
      <h1 className="font-display text-4xl text-brand-ink dark:text-brand-cream">Admin · Fotoğraf Seçimi</h1>
      <p className="mt-3 text-brand-mist">Buradan görselleri yükleyip Hakkımda sayfasında gösterilecek fotoğrafları yönetebilirsin.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {photos.map((photo, index) => (
          <div key={index} className="glass-card p-5">
            <p className="mb-3 text-sm text-brand-mist">Fotoğraf {index + 1}</p>
            <input type="file" accept="image/*" onChange={(e) => onFileChange(index, e.target.files?.[0])} />
            <input
              className="mt-3 w-full rounded-xl border border-brand-gold/30 bg-transparent px-3 py-2 text-sm"
              placeholder="Alt metin"
              value={photo.alt}
              onChange={(e) => setPhotos((prev) => prev.map((p, i) => (i === index ? { ...p, alt: e.target.value } : p)))}
            />
            {photo.src ? <img src={photo.src} alt={photo.alt || `Fotoğraf ${index + 1}`} className="mt-4 h-40 w-full rounded-xl object-cover" /> : null}
          </div>
        ))}
      </div>

      <button onClick={save} className="mt-8 rounded-full bg-brand-bronze px-6 py-3 text-white">Kaydet</button>
      {saved ? <p className="mt-3 text-sm text-green-600">Kaydedildi. Hakkımda sayfasını yenileyebilirsin.</p> : null}
    </main>
  );
}
