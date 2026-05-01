"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, X, Edit3, ExternalLink, Loader2, Eye, EyeOff } from "lucide-react";

type B = {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  reading_minutes: number;
  body: string[];
  tags: string[] | string;
  published: boolean;
  sort_order: number;
};

const empty = (): B => ({
  slug: "", title: "", excerpt: "", cover: "",
  date: new Date().toISOString().slice(0, 10),
  reading_minutes: 5, body: [""], tags: [], published: true, sort_order: 0,
});
const BLOG_TAGS = ["Yazılım", "Frontend", "Backend", "Tasarım", "Kariyer", "Verimlilik", "İpucu"];

function normTags(t: any): string[] {
  if (Array.isArray(t)) return t;
  if (typeof t === "string") {
    try { const j = JSON.parse(t); if (Array.isArray(j)) return j; } catch {}
    return t.split(",").map((s: string) => s.trim()).filter(Boolean);
  }
  return [];
}
function normBody(b: any): string[] {
  if (Array.isArray(b)) return b;
  if (typeof b === "string") {
    try { const j = JSON.parse(b); if (Array.isArray(j)) return j; } catch {}
    return [b];
  }
  return [""];
}

export default function BlogAdmin() {
  const [items, setItems] = useState<B[]>([]);
  const [editing, setEditing] = useState<B | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/posts", { cache: "no-store" });
    if (r.ok) {
      const data = await r.json();
      setItems(data.map((p: any) => ({
        ...p,
        date: typeof p.date === "string" ? p.date.slice(0, 10) : new Date(p.date).toISOString().slice(0, 10),
        body: normBody(p.body),
        tags: normTags(p.tags),
      })));
    }
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const payload = {
      ...editing,
      tags: Array.isArray(editing.tags) ? editing.tags : normTags(editing.tags),
      body: editing.body.filter((p) => p.trim()),
      reading_minutes: Number(editing.reading_minutes) || 5,
      sort_order: Number(editing.sort_order) || 0,
    };
    const url = editing.id ? `/api/admin/posts/${editing.id}` : "/api/admin/posts";
    const method = editing.id ? "PUT" : "POST";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setBusy(false);
    if (r.ok) { setEditing(null); load(); } else { const j = await r.json().catch(() => ({})); alert(j.error || "Kaydedilemedi"); }
  }

  async function remove(id: number) {
    if (!confirm("Bu yazıyı silmek istiyor musun?")) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Yazılar</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Blog</h1>
        </div>
        <button onClick={() => setEditing(empty())} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95">
          <Plus size={16} /> Yeni Yazı
        </button>
      </header>

      <div className="grid gap-3">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            {p.cover ? <img src={p.cover} alt="" className="h-16 w-24 rounded-lg object-cover" /> : <div className="h-16 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-semibold">{p.title}</h3>
                {!p.published && <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] uppercase text-slate-600 dark:bg-slate-700 dark:text-slate-300">Taslak</span>}
              </div>
              <p className="truncate text-sm text-slate-500">{p.date} · {p.reading_minutes} dk</p>
              <p className="truncate text-xs text-slate-400">/blog/{p.slug}</p>
            </div>
            <div className="flex items-center gap-1">
              <a href={`/blog/${p.slug}`} target="_blank" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><ExternalLink size={16} /></a>
              <button onClick={() => setEditing(p)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><Edit3 size={16} /></button>
              <button onClick={() => remove(p.id!)} className="grid h-9 w-9 place-items-center rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">Henüz yazı yok.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <header className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">{editing.id ? "Yazıyı Düzenle" : "Yeni Yazı"}</h2>
              <button onClick={() => setEditing(null)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Başlık" v={editing.title} on={(v: string) => setEditing({ ...editing, title: v })} />
              <Field label="Slug (url)" v={editing.slug} on={(v: string) => setEditing({ ...editing, slug: v.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} />
              <Field label="Tarih" type="date" v={editing.date} on={(v: string) => setEditing({ ...editing, date: v })} />
              <Field label="Okuma süresi (dk)" type="number" v={String(editing.reading_minutes)} on={(v: string) => setEditing({ ...editing, reading_minutes: Number(v) || 5 })} />
            </div>
            <ImagePicker className="mt-4" label="Kapak Görseli" value={editing.cover} onChange={(v: string) => setEditing({ ...editing, cover: v })} />
            <Area className="mt-4" label="Özet" v={editing.excerpt} on={(v: string) => setEditing({ ...editing, excerpt: v })} rows={2} />
            <TagPicker className="mt-4" label="Etiketler" selected={Array.isArray(editing.tags) ? editing.tags : normTags(editing.tags)} options={BLOG_TAGS} onChange={(tags: string[]) => setEditing({ ...editing, tags })} />

            <div className="mt-4">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">Yazı Paragrafları (HTML destekli)</label>
              <div className="mt-2 space-y-2">
                {editing.body.map((para, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea value={para} onChange={(e) => setEditing({ ...editing, body: editing.body.map((p, idx) => (idx === i ? e.target.value : p)) })} rows={3} className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-800" placeholder={`Paragraf ${i + 1}`} />
                    <button onClick={() => setEditing({ ...editing, body: editing.body.filter((_, idx) => idx !== i) })} className="grid h-10 w-10 place-items-center rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"><Trash2 size={16} /></button>
                  </div>
                ))}
                <button onClick={() => setEditing({ ...editing, body: [...editing.body, ""] })} className="inline-flex items-center gap-1 text-sm text-amber-600 hover:underline"><Plus size={14} /> Paragraf ekle</button>
              </div>
            </div>

            <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="h-4 w-4 rounded" />
              {editing.published ? <><Eye size={14} /> Yayında</> : <><EyeOff size={14} /> Taslak</>}
            </label>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">İptal</button>
              <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-2 text-sm font-medium text-white shadow disabled:opacity-60">
                {busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, v, on, type = "text", className = "" }: any) {
  return (
    <label className={`grid gap-1.5 text-sm ${className}`}>
      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <input type={type} value={v} onChange={(e) => on(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
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
function TagPicker({ label, selected, options, onChange, className = "" }: any) {
  return <div className={`grid gap-1.5 text-sm ${className}`}><span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span><div className="flex flex-wrap gap-2">{options.map((tag: string) => <button type="button" key={tag} onClick={() => onChange(selected.includes(tag) ? selected.filter((t: string) => t !== tag) : [...selected, tag])} className={`rounded-full border px-3 py-1 text-xs ${selected.includes(tag) ? "border-rose-500 bg-rose-100 text-rose-700" : "border-slate-300 text-slate-600"}`}>{tag}</button>)}</div></div>;
}
function ImagePicker({ label, value, onChange, className = "" }: any) {
  const onFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.readAsDataURL(file);
  };
  return <div className={`grid gap-2 text-sm ${className}`}><span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span><input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />{value && <img src={value} alt="" className="h-28 w-full rounded-xl object-cover md:w-72" />}</div>;
}
