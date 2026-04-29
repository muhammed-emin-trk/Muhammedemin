"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Loader2, Upload } from "lucide-react";

type Photo = { id: number; src: string; alt: string; sort_order: number };

const toCompressed = (file: File, maxSide = 1600, quality = 0.82): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Dosya okunamadı"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Görsel açılamadı"));
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        const ctx = c.getContext("2d");
        if (!ctx) return reject(new Error("Canvas hata"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", quality));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });

export default function PhotosAdmin() {
  const [items, setItems] = useState<Photo[]>([]);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const r = await fetch("/api/admin/photos");
    if (r.ok) setItems(await r.json());
  }
  useEffect(() => { load(); }, []);

  async function upload(files?: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      for (const f of Array.from(files)) {
        const src = await toCompressed(f);
        await fetch("/api/admin/photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ src, alt: f.name, sort_order: items.length }),
        });
      }
      await load();
    } catch (e: any) {
      alert(e.message || "Yükleme başarısız");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function addUrl() {
    const src = prompt("Görsel URL'si:");
    if (!src) return;
    await fetch("/api/admin/photos", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ src, alt: "", sort_order: items.length }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/admin/photos/${id}`, { method: "DELETE" });
    load();
  }

  async function updateAlt(id: number, alt: string) {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    await fetch(`/api/admin/photos/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ src: item.src, alt, sort_order: item.sort_order }),
    });
    load();
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Galeri</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Fotoğraflar</h1>
          <p className="mt-2 text-sm text-slate-500">Hakkımda sayfasında görüntülenecek kişisel görselleri buradan yönet.</p>
        </div>
        <div className="flex gap-2">
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => upload(e.target.files)} />
          <button onClick={() => fileRef.current?.click()} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow disabled:opacity-60">
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Yükle
          </button>
          <button onClick={addUrl} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">
            <Plus size={16} /> URL Ekle
          </button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800">
              <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
              <button onClick={() => remove(p.id)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-rose-600 shadow hover:bg-white"><Trash2 size={14} /></button>
            </div>
            <input
              defaultValue={p.alt}
              onBlur={(e) => updateAlt(p.id, e.target.value)}
              placeholder="Alt metin"
              className="w-full border-t border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-800"
            />
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">Henüz fotoğraf yok.</p>}
    </div>
  );
}
