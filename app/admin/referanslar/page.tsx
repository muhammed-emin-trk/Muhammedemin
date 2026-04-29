"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, X, Edit3, Loader2, Star } from "lucide-react";

type T = { id?: number; name: string; role: string; avatar: string; content: string; rating: number; sort_order: number };
const empty = (): T => ({ name: "", role: "", avatar: "", content: "", rating: 5, sort_order: 0 });

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<T[]>([]);
  const [editing, setEditing] = useState<T | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() { const r = await fetch("/api/admin/testimonials"); if (r.ok) setItems(await r.json()); }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const url = editing.id ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials";
    const r = await fetch(url, { method: editing.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...editing, sort_order: Number(editing.sort_order) || 0, rating: Number(editing.rating) || 5 }) });
    setBusy(false);
    if (r.ok) { setEditing(null); load(); }
  }

  async function remove(id: number) {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Sosyal Kanıt</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Referanslar</h1>
        </div>
        <button onClick={() => setEditing(empty())} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95"><Plus size={16} /> Yeni</button>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {t.avatar ? <img src={t.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className="h-10 w-10 rounded-full bg-slate-100" />}
                <div className="min-w-0"><p className="truncate font-medium">{t.name}</p><p className="truncate text-xs text-slate-500">{t.role}</p></div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditing(t)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><Edit3 size={14} /></button>
                <button onClick={() => remove(t.id!)} className="grid h-8 w-8 place-items-center rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{t.content}</p>
            <div className="mt-2 flex">{Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}</div>
          </div>
        ))}
        {items.length === 0 && <p className="md:col-span-2 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">Henüz referans yok.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <header className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-semibold">{editing.id ? "Düzenle" : "Yeni Referans"}</h2><button onClick={() => setEditing(null)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button></header>
            <div className="grid gap-4">
              <label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">İsim</span><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label>
              <label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Ünvan / Şirket</span><input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label>
              <label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Avatar URL</span><input value={editing.avatar} onChange={(e) => setEditing({ ...editing, avatar: e.target.value })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label>
              <label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Yorum</span><textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={4} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label>
              <div className="grid grid-cols-2 gap-4">
                <label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Yıldız (1-5)</span><input type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) || 5 })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label>
                <label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Sıra</span><input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) || 0 })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">İptal</button>
              <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 text-sm font-medium text-white shadow disabled:opacity-60">{busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
