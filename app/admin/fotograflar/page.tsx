"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Loader2, Upload, ImagePlus } from "lucide-react";

type Photo = { id: number; src: string; alt: string; sort_order: number };

const toCompressed = (file: File, maxSide = 1280, quality = 0.78, maxBytes = 450_000): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Dosya okunamadı"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Görsel açılamadı"));
      img.onload = () => {
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        if (!ctx) return reject(new Error("Canvas hata"));

        const baseScale = Math.min(1, maxSide / Math.max(img.width, img.height));
        let dimensionScale = 1;
        let output = "";

        for (let attempt = 0; attempt < 6; attempt += 1) {
          const w = Math.max(1, Math.round(img.width * baseScale * dimensionScale));
          const h = Math.max(1, Math.round(img.height * baseScale * dimensionScale));
          c.width = w;
          c.height = h;
          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);

          const adjustedQuality = Math.max(0.5, quality - attempt * 0.06);
          output = c.toDataURL("image/jpeg", adjustedQuality);
          const estimatedBytes = Math.ceil((output.length * 3) / 4);
          if (estimatedBytes <= maxBytes) break;
          dimensionScale *= 0.85;
        }

        resolve(output);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });

export default function PhotosAdmin() {
  const [items, setItems] = useState<Photo[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const r = await fetch("/api/admin/photos");
    if (r.ok) setItems(await r.json());
  }
  useEffect(() => { load(); }, []);

  async function upload(files?: FileList | null) {
    if (!files?.length) return;
    setStatus("");
    const picked = Array.from(files);
    setSelected(picked.map((f) => f.name));
    setBusy(true);
    try {
      for (const [i, f] of picked.entries()) {
        const src = await toCompressed(f);
        const res = await fetch("/api/admin/photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ src, alt: f.name, sort_order: items.length + i }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Yükleme başarısız");
        }
      }
      await load();
      setStatus(`${picked.length} fotoğraf yüklendi.`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Yükleme başarısız";
      setStatus(message);
      alert(message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
      setSelected([]);
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

      {(selected.length > 0 || status) && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
          {selected.length > 0 && busy && (
            <p className="inline-flex items-center gap-2"><ImagePlus size={16} className="text-sky-500" /> Seçilen: {selected.join(", ")}</p>
          )}
          {status && <p>{status}</p>}
        </div>
      )}

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
