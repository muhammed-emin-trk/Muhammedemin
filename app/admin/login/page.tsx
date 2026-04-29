"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd }),
    });
    setLoading(false);
    if (r.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const j = await r.json().catch(() => ({}));
      setErr(j.error || "Giriş başarısız");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-amber-200/50 bg-white/90 p-8 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mb-6 flex items-center justify-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg">
            <Lock size={22} />
          </div>
        </div>
        <h1 className="text-center font-display text-2xl font-semibold">Yönetim Paneli</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Devam etmek için şifreni gir</p>

        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          autoFocus
          placeholder="Şifre"
          className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:border-slate-700 dark:bg-slate-800"
        />

        {err && <p className="mt-3 text-sm text-rose-600">{err}</p>}

        <button
          disabled={loading}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-5 py-3 font-medium text-white shadow-lg transition hover:opacity-95 disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : null}
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
