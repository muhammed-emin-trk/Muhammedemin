"use client";

import { useEffect, useState } from "react";
import { PERSONAL_PHOTOS_KEY, type PersonalPhoto } from "@/components/site/personal-photos";

const emptySlot = (): PersonalPhoto => ({ src: "", alt: "" });

const toOptimizedDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Dosya okunamadı"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Görsel işlenemedi"));
      image.onload = () => {
        const maxSide = 1600;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas başlatılamadı"));

        ctx.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      if (typeof reader.result !== "string") return reject(new Error("Dosya okunamadı"));
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });


export default function AdminPage() {
  const [photos, setPhotos] = useState<PersonalPhoto[]>([emptySlot(), emptySlot(), emptySlot(), emptySlot()]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const onFileChange = async (index: number, file?: File) => {
    if (!file) return;
    setError(null);
    try {
      const src = await toOptimizedDataUrl(file);
      setPhotos((prev) => prev.map((p, i) => (i === index ? { ...p, src } : p)));
    } catch {
      setError("Görsel yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.");
    }
  };

  const save = () => {
    const filtered = photos.filter((p) => p.src.trim().length > 0).map((p) => ({ src: p.src, alt: p.alt || "Kişisel fotoğraf" }));
    setError(null);
    try {
      localStorage.setItem(PERSONAL_PHOTOS_KEY, JSON.stringify(filtered));
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch {
      setSaved(false);
      setError("Kaydetme başarısız oldu. Daha küçük görseller seçip tekrar deneyin.");
    }
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
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </main>
  );
}
