"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, X, Edit3, Loader2 } from "lucide-react";

type F = { id?: number; question: string; answer: string; sort_order: number };
const empty = (): F => ({ question: "", answer: "", sort_order: 0 });

export default function FaqsAdmin() {
  const [items, setItems] = useState<F[]>([]);
  const [editing, setEditing] = useState<F | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() { const r = await fetch("/api/admin/faqs"); if (r.ok) setItems(await r.json()); }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const url = editing.id ? `/api/admin/faqs/${editing.id}` : "/api/admin/faqs";
    const r = await fetch(url, { method: editing.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...editing, sort_order: Number(editing.sort_order) || 0 }) });
    setBusy(false);
    if (r.ok) { setEditing(null); load(); }
  }

  async function remove(id: number) {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Bilgi</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Sıkça Sorulan Sorular</h1>
        </div>
        <button onClick={() => setEditing(empty())} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95"><Plus size={16} /> Yeni</button>
      </header>

      <div className="space-y-3">
        {items.map((f) => (
          <div key={f.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium">{f.question}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.answer}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button onClick={() => setEditing(f)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><Edit3 size={14} /></button>
                <button onClick={() => remove(f.id!)} className="grid h-8 w-8 place-items-center rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">Henüz soru yok.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <header className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-semibold">{editing.id ? "Düzenle" : "Yeni Soru"}</h2><button onClick={() => setEditing(null)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button></header>
            <div className="grid gap-4">
              <label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Soru</span><input value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label>
              <label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Cevap</span><textarea value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} rows={4} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label>
              <label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Sıra</span><input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) || 0 })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">İptal</button>
              <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-2 text-sm font-medium text-white shadow disabled:opacity-60">{busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
