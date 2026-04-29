"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Check } from "lucide-react";

type S = {
  hero_badge: string; hero_title: string; hero_subtitle: string; hero_description: string;
  email: string; phone: string; whatsapp: string; location: string;
  github: string; linkedin: string; instagram: string;
};

const blank: S = { hero_badge: "", hero_title: "", hero_subtitle: "", hero_description: "", email: "", phone: "", whatsapp: "", location: "", github: "", linkedin: "", instagram: "" };

export default function SettingsPage() {
  const [s, setS] = useState<S>(blank);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((d) => setS({ ...blank, ...d }));
  }, []);

  async function save() {
    setBusy(true);
    const r = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) });
    setBusy(false);
    if (r.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Genel</p>
        <h1 className="mt-2 font-display text-3xl font-semibold">Site Ayarları</h1>
        <p className="mt-2 text-sm text-slate-500">Hero metinleri ve iletişim bilgileri burada düzenlenir.</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 font-display text-lg font-semibold">Anasayfa Hero</h2>
        <div className="grid gap-4">
          <F label="Üst Rozet (örn: 'Bursa — Yeni fırsatlara açık')" v={s.hero_badge} on={(v) => setS({ ...s, hero_badge: v })} />
          <F label="Ana Başlık" v={s.hero_title} on={(v) => setS({ ...s, hero_title: v })} />
          <F label="Alt Başlık" v={s.hero_subtitle} on={(v) => setS({ ...s, hero_subtitle: v })} />
          <A label="Açıklama" v={s.hero_description} on={(v) => setS({ ...s, hero_description: v })} rows={3} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 font-display text-lg font-semibold">İletişim</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <F label="E-posta" v={s.email} on={(v) => setS({ ...s, email: v })} />
          <F label="Telefon" v={s.phone} on={(v) => setS({ ...s, phone: v })} />
          <F label="WhatsApp Linki" v={s.whatsapp} on={(v) => setS({ ...s, whatsapp: v })} />
          <F label="Konum" v={s.location} on={(v) => setS({ ...s, location: v })} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 font-display text-lg font-semibold">Sosyal Medya</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <F label="GitHub" v={s.github} on={(v) => setS({ ...s, github: v })} />
          <F label="LinkedIn" v={s.linkedin} on={(v) => setS({ ...s, linkedin: v })} />
          <F label="Instagram" v={s.instagram} on={(v) => setS({ ...s, instagram: v })} />
        </div>
      </section>

      <div className="sticky bottom-4 flex items-center gap-3">
        <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-3 font-medium text-white shadow-lg disabled:opacity-60">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Tüm Ayarları Kaydet
        </button>
        {saved && <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"><Check size={14} /> Kaydedildi</span>}
      </div>
    </div>
  );
}

function F({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <input value={v} onChange={(e) => on(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
    </label>
  );
}
function A({ label, v, on, rows = 3 }: { label: string; v: string; on: (v: string) => void; rows?: number }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <textarea value={v} rows={rows} onChange={(e) => on(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
    </label>
  );
}
