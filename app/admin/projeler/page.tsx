"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, X, Edit3, Star, ExternalLink, Loader2 } from "lucide-react";

type P = {
  id?: number;
  slug: string;
  title: string;
  category: string;
  year: number | string;
  role: string;
  cover: string;
  description: string;
  content: string[];
  tags: string[] | string;
  featured: boolean;
  sort_order: number;
};

const empty = (): P => ({
  slug: "", title: "", category: "", year: new Date().getFullYear(), role: "", cover: "",
  description: "", content: [""], tags: [], featured: false, sort_order: 0,
});

function normalizeTags(t: any): string[] {
  if (Array.isArray(t)) return t;
  if (!t) return [];
  if (typeof t === "string") {
    try { const j = JSON.parse(t); if (Array.isArray(j)) return j; } catch {}
    return t.split(",").map((s: string) => s.trim()).filter(Boolean);
  }
  return [];
}
function normalizeContent(c: any): string[] {
  if (Array.isArray(c)) return c;
  if (!c) return [""];
  if (typeof c === "string") {
    try { const j = JSON.parse(c); if (Array.isArray(j)) return j; } catch {}
    return [c];
  }
  return [""];
}

export default function ProjectsPage() {
  const [items, setItems] = useState<P[]>([]);
  const [editing, setEditing] = useState<P | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/projects", { cache: "no-store" });
    if (r.ok) {
      const data = await r.json();
      setItems(data.map((p: any) => ({ ...p, content: normalizeContent(p.content), tags: normalizeTags(p.tags) })));
    }
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const payload = {
      ...editing,
      tags: Array.isArray(editing.tags) ? editing.tags : normalizeTags(editing.tags),
      content: editing.content.filter((p) => p.trim()),
      year: Number(editing.year) || null,
      sort_order: Number(editing.sort_order) || 0,
    };
    const url = editing.id ? `/api/admin/projects/${editing.id}` : "/api/admin/projects";
    const method = editing.id ? "PUT" : "POST";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setBusy(false);
    if (r.ok) {
      const j = await r.json().catch(() => ({}));
      if (j?.github?.warning) alert(j.github.warning);
      setEditing(null);
      load();
    } else {
      const j = await r.json().catch(() => ({}));
      alert(j.error || "Kaydedilemedi");
    }
  }

  async function remove(id: number) {
    if (!confirm("Bu projeyi silmek istediğine emin misin?")) return;
    const r = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    const j = await r.json().catch(() => ({}));
    if (j?.github?.warning) alert(j.github.warning);
    load();
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Çalışmalar</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Projeler</h1>
        </div>
        <button onClick={() => setEditing(empty())} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95">
          <Plus size={16} /> Yeni Proje
        </button>
      </header>

      <div className="grid gap-3">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            {p.cover ? <img src={p.cover} alt="" className="h-16 w-24 rounded-lg object-cover" /> : <div className="h-16 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-semibold">{p.title}</h3>
                {p.featured && <Star size={14} className="fill-amber-400 text-amber-400" />}
              </div>
              <p className="truncate text-sm text-slate-500">{p.category} · {p.year}</p>
              <p className="truncate text-xs text-slate-400">/projeler/{p.slug}</p>
            </div>
            <div className="flex items-center gap-1">
              <a href={`/projeler/${p.slug}`} target="_blank" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title="Görüntüle"><ExternalLink size={16} /></a>
              <button onClick={() => setEditing({ ...p, year: p.year || "" })} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title="Düzenle"><Edit3 size={16} /></button>
              <button onClick={() => remove(p.id!)} className="grid h-9 w-9 place-items-center rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40" title="Sil"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">Henüz proje yok. Yeni eklemek için yukarıdaki butona tıkla.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <header className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">{editing.id ? "Projeyi Düzenle" : "Yeni Proje"}</h2>
              <button onClick={() => setEditing(null)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Başlık" v={editing.title} on={(v) => setEditing({ ...editing, title: v })} />
              <Field label="Slug (url)" v={editing.slug} on={(v) => setEditing({ ...editing, slug: v.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} placeholder="proje-adi" />
              <Field label="Kategori" v={editing.category} on={(v) => setEditing({ ...editing, category: v })} />
              <Field label="Yıl" type="number" v={String(editing.year)} on={(v) => setEditing({ ...editing, year: v })} />
              <Field label="Rolün" v={editing.role} on={(v) => setEditing({ ...editing, role: v })} />
              <Field label="Sıralama (küçük üstte)" type="number" v={String(editing.sort_order)} on={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })} />
            </div>
            <Field className="mt-4" label="Kapak Görseli URL" v={editing.cover} on={(v) => setEditing({ ...editing, cover: v })} placeholder="https://..." />
            <Area className="mt-4" label="Kısa Açıklama" v={editing.description} on={(v) => setEditing({ ...editing, description: v })} rows={2} />
            <Field className="mt-4" label="Etiketler (virgülle)" v={Array.isArray(editing.tags) ? editing.tags.join(", ") : String(editing.tags)} on={(v) => setEditing({ ...editing, tags: v.split(",").map((s) => s.trim()).filter(Boolean) })} />

            <div className="mt-4">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">İçerik Paragrafları</label>
              <div className="mt-2 space-y-2">
                {editing.content.map((para, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea
                      value={para}
                      onChange={(e) => setEditing({ ...editing, content: editing.content.map((p, idx) => (idx === i ? e.target.value : p)) })}
                      rows={2}
                      className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-800"
                      placeholder={`Paragraf ${i + 1}`}
                    />
                    <button onClick={() => setEditing({ ...editing, content: editing.content.filter((_, idx) => idx !== i) })} className="grid h-10 w-10 place-items-center rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"><Trash2 size={16} /></button>
                  </div>
                ))}
                <button onClick={() => setEditing({ ...editing, content: [...editing.content, ""] })} className="inline-flex items-center gap-1 text-sm text-amber-600 hover:underline"><Plus size={14} /> Paragraf ekle</button>
              </div>
            </div>

            <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="h-4 w-4 rounded" />
              Öne çıkar (anasayfada göster)
            </label>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">İptal</button>
              <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-medium text-white shadow disabled:opacity-60">
                {busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, v, on, type = "text", placeholder, className = "" }: any) {
  return (
    <label className={`grid gap-1.5 text-sm ${className}`}>
      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <input type={type} value={v} placeholder={placeholder} onChange={(e) => on(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
    </label>
  );
}
function Area({ label, v, on, rows = 3, className = "" }: any) {
  return (
    <label className={`grid gap-1.5 text-sm ${className}`}>
      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <textarea value={v} rows={rows} onChange={(e) => on(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
    </label>
  );
}
