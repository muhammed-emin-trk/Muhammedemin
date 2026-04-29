"use client";

import { useEffect, useState } from "react";
import { Mail, Star, StarOff, Trash2, Reply, Check, ExternalLink, Inbox, Search } from "lucide-react";

type M = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  is_starred: boolean;
  reply: string | null;
  replied_at: string | null;
  created_at: string;
};

export default function MessagesPage() {
  const [items, setItems] = useState<M[]>([]);
  const [active, setActive] = useState<M | null>(null);
  const [reply, setReply] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const r = await fetch("/api/admin/messages");
    if (r.ok) setItems(await r.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function patch(id: number, data: Partial<M>) {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    load();
  }
  async function remove(id: number) {
    if (!confirm("Bu mesajı silmek istediğine emin misin?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (active?.id === id) setActive(null);
    load();
  }

  async function open(m: M) {
    setActive(m);
    setReply(m.reply || "");
    if (!m.is_read) await patch(m.id, { is_read: true });
  }

  const filtered = items
    .filter((m) => (filter === "all" ? true : filter === "unread" ? !m.is_read : m.is_starred))
    .filter((m) =>
      !search
        ? true
        : `${m.name} ${m.email} ${m.subject || ""} ${m.message}`.toLowerCase().includes(search.toLowerCase())
    );

  const unread = items.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Gelen Kutusu</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Mesajlar {unread > 0 && <span className="ml-2 align-middle text-base text-amber-600">({unread} yeni)</span>}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ara..."
              className="rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div className="flex rounded-lg border border-slate-200 bg-white p-1 text-sm dark:border-slate-700 dark:bg-slate-800">
            {(["all", "unread", "starred"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 transition ${
                  filter === f ? "bg-amber-500 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {f === "all" ? "Tümü" : f === "unread" ? "Okunmamış" : "Yıldızlı"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-12">
        <ul className="space-y-2 lg:col-span-5">
          {loading && <li className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">Yükleniyor...</li>}
          {!loading && filtered.length === 0 && (
            <li className="grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
              <Inbox className="text-slate-400" size={32} />
              <p className="mt-3 text-sm text-slate-500">Burada görüntülenecek mesaj yok.</p>
            </li>
          )}
          {filtered.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => open(m)}
                className={`w-full rounded-xl border p-4 text-left transition hover:border-amber-300 ${
                  active?.id === m.id
                    ? "border-amber-400 bg-amber-50 dark:bg-amber-500/10"
                    : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className={`truncate ${m.is_read ? "" : "font-semibold"}`}>{m.name}</p>
                  <div className="flex items-center gap-1.5">
                    {m.is_starred && <Star size={14} className="fill-amber-400 text-amber-400" />}
                    {!m.is_read && <span className="h-2 w-2 rounded-full bg-amber-500" />}
                    {m.reply && <Check size={14} className="text-emerald-500" />}
                  </div>
                </div>
                <p className="mt-1 truncate text-sm text-slate-600 dark:text-slate-400">{m.subject || "(konu yok)"}</p>
                <p className="mt-1 truncate text-xs text-slate-400">{new Date(m.created_at).toLocaleString("tr-TR")}</p>
              </button>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-7">
          {active ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <header className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-semibold">{active.subject || "(konu yok)"}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{active.name}</span> · {active.email}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{new Date(active.created_at).toLocaleString("tr-TR")}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button onClick={() => patch(active.id, { is_starred: !active.is_starred })} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title="Yıldızla">
                    {active.is_starred ? <Star size={16} className="fill-amber-400 text-amber-400" /> : <StarOff size={16} />}
                  </button>
                  <a
                    href={`mailto:${active.email}?subject=Re: ${encodeURIComponent(active.subject || "")}&body=${encodeURIComponent(reply || "")}`}
                    className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="E-posta ile yanıtla"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button onClick={() => remove(active.id)} className="grid h-9 w-9 place-items-center rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40" title="Sil">
                    <Trash2 size={16} />
                  </button>
                </div>
              </header>

              <div className="mt-5 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed dark:border-slate-800 dark:bg-slate-950/40">
                {active.message}
              </div>

              <div className="mt-6">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-500">Notların / yanıt taslağı</label>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={5}
                  placeholder="Bu mesaja vereceğin yanıtı buraya not edebilirsin..."
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-800"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => patch(active.id, { reply })}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95"
                  >
                    <Check size={14} /> Yanıtı Kaydet
                  </button>
                  <a
                    href={`mailto:${active.email}?subject=${encodeURIComponent("Re: " + (active.subject || ""))}&body=${encodeURIComponent(reply)}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    <Reply size={14} /> E-posta İle Gönder
                  </a>
                </div>
                {active.replied_at && (
                  <p className="mt-3 text-xs text-emerald-600">Son kayıt: {new Date(active.replied_at).toLocaleString("tr-TR")}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid h-full min-h-[300px] place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
              <Mail className="text-slate-400" size={36} />
              <p className="mt-3 text-sm text-slate-500">Bir mesaj seçtiğinde içerik burada görünecek.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
