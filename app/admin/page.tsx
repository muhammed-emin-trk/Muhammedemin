"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ADMIN_STORAGE_KEY, defaultGalleryItems, type GalleryItem } from "@/lib/siteContent";

const emptyMessage = "Henüz kayıt yok.";

export default function AdminPage() {
  const [items, setItems] = useState<GalleryItem[]>(defaultGalleryItems);
  const [status, setStatus] = useState<string>(emptyMessage);

  useEffect(() => {
    const saved = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as GalleryItem[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setItems(parsed);
        setStatus("Kayıtlı içerik yüklendi.");
      }
    } catch {
      setStatus("Kayıt okunamadı, varsayılan içerik gösteriliyor.");
    }
  }, []);

  const updateField = (id: string, key: keyof GalleryItem, value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(items));
    setStatus("Kaydedildi. Ana sayfayı yenilediğinizde yeni görseller görünecek.");
  };

  const handleReset = () => {
    window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    setItems(defaultGalleryItems);
    setStatus("Varsayılan içerik geri yüklendi.");
  };

  return (
    <main className="min-h-screen bg-slate-100 py-12 dark:bg-slate-950">
      <section className="section-container max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Admin Paneli</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Galeri kartlarını buradan yönetebilirsiniz. Değişiklikler cihazınızın tarayıcısında saklanır.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl bg-brand-indigo px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Siteye Dön
          </Link>
        </div>

        <form onSubmit={handleSave} className="mt-8 space-y-6">
          {items.map((item, index) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Kart {index + 1}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
                  Başlık
                  <input
                    value={item.title}
                    onChange={(e) => updateField(item.id, "title", e.target.value)}
                    className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-brand-indigo focus:ring-2 dark:border-slate-600"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
                  Görsel URL
                  <input
                    value={item.imageUrl}
                    onChange={(e) => updateField(item.id, "imageUrl", e.target.value)}
                    className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-brand-indigo focus:ring-2 dark:border-slate-600"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200 md:col-span-2">
                  Açıklama
                  <textarea
                    value={item.subtitle}
                    onChange={(e) => updateField(item.id, "subtitle", e.target.value)}
                    rows={3}
                    className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-brand-indigo focus:ring-2 dark:border-slate-600"
                  />
                </label>
              </div>
            </article>
          ))}

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">
              Kaydet
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-600"
            >
              Sıfırla
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Durum: {status}</p>
      </section>
    </main>
  );
}
