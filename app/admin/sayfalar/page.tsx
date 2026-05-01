"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, X, Edit3, ExternalLink, Loader2, Eye, EyeOff, Compass } from "lucide-react";

type Pg = {
  id?: number;
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  category: string;
  tags: string[] | string;
  body: string[];
  show_in_nav: boolean;
  published: boolean;
  sort_order: number;
};

const empty = (): Pg => ({ slug: "", title: "", subtitle: "", cover: "", category: "", tags: [], body: [""], show_in_nav: false, published: true, sort_order: 0 });
const PAGE_CATEGORIES = ["Kurumsal", "Yasal", "Pazarlama", "Hizmet", "Diğer"];
const PAGE_TAGS = ["Kurumsal", "SSS", "Gizlilik", "KVKK", "Hizmet", "Referans"];

function normBody(b: any): string[] {
  if (Array.isArray(b)) return b;
  if (typeof b === "string") {
    try { const j = JSON.parse(b); if (Array.isArray(j)) return j; } catch {}
    return [b];
  }
  return [""];
}
function normTags(t: any): string[] {
  if (Array.isArray(t)) return t;
  if (!t) return [];
  if (typeof t === "string") {
    try { const j = JSON.parse(t); if (Array.isArray(j)) return j; } catch {}
    return t.split(",").map((s: string) => s.trim()).filter(Boolean);
  }
  return [];
}

export default function PagesAdmin() {
  const [items, setItems] = useState<Pg[]>([]);
  const [editing, setEditing] = useState<Pg | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/pages", { cache: "no-store" });
    if (r.ok) {
      const data = await r.json();
      setItems(data.map((p: any) => ({ ...p, body: normBody(p.body), tags: normTags(p.tags) })));
    }
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const payload = { ...editing, tags: Array.isArray(editing.tags) ? editing.tags : normTags(editing.tags), body: editing.body.filter((p) => p.trim()), sort_order: Number(editing.sort_order) || 0 };
    const url = editing.id ? `/api/admin/pages/${editing.id}` : "/api/admin/pages";
    const method = editing.id ? "PUT" : "POST";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setBusy(false);
    if (r.ok) { setEditing(null); load(); } else { const j = await r.json().catch(() => ({})); alert(j.error || "Kaydedilemedi"); }
  }

  async function remove(id: number) {
    if (!confirm("Bu sayfayı silmek istiyor musun?")) return;
    await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
    load();
  }

  return (<div className="space-y-6">{/* content unchanged for brevity */}
    <header className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.3em] text-amber-600">İçerik</p><h1 className="mt-2 font-display text-3xl font-semibold">Özel Sayfalar</h1><p className="mt-2 text-sm text-slate-500">Hizmetler, referanslar, gizlilik politikası gibi yeni sayfalar buradan eklenir.</p></div><button onClick={() => setEditing(empty())} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95"><Plus size={16} /> Yeni Sayfa</button></header>
    <div className="grid gap-3">{items.map((p) => (<div key={p.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white"><Compass size={20} /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h3 className="truncate font-semibold">{p.title}</h3>{!p.published && <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] uppercase text-slate-600 dark:bg-slate-700 dark:text-slate-300">Taslak</span>}{p.show_in_nav && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] uppercase text-amber-700">Menüde</span>}</div><p className="truncate text-xs text-slate-400">/sayfa/{p.slug}</p></div><div className="flex items-center gap-1"><a href={`/sayfa/${p.slug}`} target="_blank" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><ExternalLink size={16} /></a><button onClick={() => setEditing(p)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><Edit3 size={16} /></button><button onClick={() => remove(p.id!)} className="grid h-9 w-9 place-items-center rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"><Trash2 size={16} /></button></div></div>))}</div>
    {editing && <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"><div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900"><header className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-semibold">{editing.id ? "Sayfayı Düzenle" : "Yeni Sayfa"}</h2><button onClick={() => setEditing(null)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button></header><div className="grid gap-4 md:grid-cols-2"><label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Başlık</span><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label><label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Slug</span><input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label></div><label className="mt-4 grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">Alt Başlık</span><input value={editing.subtitle} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" /></label><div className="mt-4 grid gap-4 md:grid-cols-2"><SelectField label="Kategori" value={editing.category} options={PAGE_CATEGORIES} onChange={(v: string) => setEditing({ ...editing, category: v })} /><TagPicker label="Etiketler" selected={Array.isArray(editing.tags) ? editing.tags : normTags(editing.tags)} options={PAGE_TAGS} onChange={(tags: string[]) => setEditing({ ...editing, tags })} /></div><ImagePicker className="mt-4" label="Kapak Görseli" value={editing.cover} onChange={(v: string) => setEditing({ ...editing, cover: v })} /><div className="mt-4"><label className="text-xs uppercase tracking-[0.2em] text-slate-500">İçerik (HTML destekli)</label><div className="mt-2 space-y-2">{editing.body.map((para, i) => (<div key={i} className="flex gap-2"><textarea value={para} onChange={(e) => setEditing({ ...editing, body: editing.body.map((p, idx) => (idx === i ? e.target.value : p)) })} rows={3} className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-800" /><button onClick={() => setEditing({ ...editing, body: editing.body.filter((_, idx) => idx !== i) })} className="grid h-10 w-10 place-items-center rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"><Trash2 size={16} /></button></div>))}</div></div><div className="mt-4 flex flex-wrap gap-4 text-sm"><label className="inline-flex cursor-pointer items-center gap-2"><input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="h-4 w-4 rounded" />{editing.published ? <><Eye size={14} /> Yayında</> : <><EyeOff size={14} /> Taslak</>}</label><label className="inline-flex cursor-pointer items-center gap-2"><input type="checkbox" checked={editing.show_in_nav} onChange={(e) => setEditing({ ...editing, show_in_nav: e.target.checked })} className="h-4 w-4 rounded" />Menüde göster</label><label className="inline-flex items-center gap-2">Sıra: <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) || 0 })} className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-800" /></label></div><div className="mt-6 flex justify-end gap-2"><button onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">İptal</button><button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 px-5 py-2 text-sm font-medium text-white shadow disabled:opacity-60">{busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Kaydet</button></div></div></div>}
  </div>);
}
function SelectField({ label, value, onChange, options }: any) { return <label className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"><option value="">Seçiniz</option>{options.map((o: string) => <option key={o} value={o}>{o}</option>)}</select></label>; }
function TagPicker({ label, selected, options, onChange }: any) { return <div className="grid gap-1.5 text-sm"><span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span><div className="flex flex-wrap gap-2">{options.map((tag: string) => <button type="button" key={tag} onClick={() => onChange(selected.includes(tag) ? selected.filter((t: string) => t !== tag) : [...selected, tag])} className={`rounded-full border px-3 py-1 text-xs ${selected.includes(tag) ? "border-violet-500 bg-violet-100 text-violet-700" : "border-slate-300 text-slate-600"}`}>{tag}</button>)}</div></div>; }
function ImagePicker({ label, value, onChange, className = "" }: any) { const onFile = (file?: File) => { if (!file) return; const reader = new FileReader(); reader.onload = () => onChange(String(reader.result || "")); reader.readAsDataURL(file); }; return <div className={`grid gap-2 text-sm ${className}`}><span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span><input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />{value && <img src={value} alt="" className="h-28 w-full rounded-xl object-cover md:w-72" />}</div>; }
