import Link from "next/link";
import { query } from "@/lib/db";
import { FolderKanban, BookOpen, FileText, Mail, Image as ImageIcon, ArrowUpRight } from "lucide-react";

async function getStats() {
  const [p, b, m, mu, pg, ph] = await Promise.all([
    query("SELECT count(*)::int c FROM projects"),
    query("SELECT count(*)::int c FROM posts"),
    query("SELECT count(*)::int c FROM messages"),
    query("SELECT count(*)::int c FROM messages WHERE is_read=false"),
    query("SELECT count(*)::int c FROM pages"),
    query("SELECT count(*)::int c FROM personal_photos"),
  ]);
  return {
    projects: p[0]?.c ?? 0,
    posts: b[0]?.c ?? 0,
    messages: m[0]?.c ?? 0,
    unread: mu[0]?.c ?? 0,
    pages: pg[0]?.c ?? 0,
    photos: ph[0]?.c ?? 0,
  };
}

async function recentMessages() {
  return await query<any>("SELECT id,name,email,subject,is_read,created_at FROM messages ORDER BY created_at DESC LIMIT 5");
}

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const s = await getStats();
  const recent = await recentMessages();

  const cards = [
    { label: "Projeler", value: s.projects, href: "/admin/projeler", icon: FolderKanban, grad: "from-amber-500 to-orange-500" },
    { label: "Blog Yazıları", value: s.posts, href: "/admin/blog", icon: BookOpen, grad: "from-rose-500 to-pink-500" },
    { label: "Sayfalar", value: s.pages, href: "/admin/sayfalar", icon: FileText, grad: "from-violet-500 to-purple-500" },
    { label: "Mesajlar", value: s.messages, sub: `${s.unread} okunmamış`, href: "/admin/mesajlar", icon: Mail, grad: "from-emerald-500 to-teal-500" },
    { label: "Fotoğraflar", value: s.photos, href: "/admin/fotograflar", icon: ImageIcon, grad: "from-sky-500 to-cyan-500" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Hoş geldin</p>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Bugünden ne yapmak istersin?</h1>
        <p className="mt-2 text-slate-500">Her şey buradan: projeler, blog, mesajlar ve sayfa içerikleri tek panelde.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${c.grad} opacity-20 blur-2xl transition group-hover:opacity-40`} />
            <div className={`relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${c.grad} text-white shadow`}>
              <c.icon size={20} />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-slate-500">{c.label}</p>
            <p className="mt-1 font-display text-3xl font-semibold">{c.value}</p>
            {c.sub && <p className="mt-1 text-sm text-amber-600">{c.sub}</p>}
            <ArrowUpRight className="absolute right-5 top-5 text-slate-400 transition group-hover:rotate-45 group-hover:text-amber-500" size={18} />
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <header className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <h2 className="font-display text-xl font-semibold">Son Mesajlar</h2>
          <Link href="/admin/mesajlar" className="text-sm text-amber-600 hover:underline">Tümü →</Link>
        </header>
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {recent.length === 0 && <li className="p-8 text-center text-slate-500">Henüz mesaj yok.</li>}
          {recent.map((m: any) => (
            <li key={m.id} className="flex items-center justify-between gap-4 p-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{m.name}</p>
                  {!m.is_read && <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">Yeni</span>}
                </div>
                <p className="truncate text-sm text-slate-500">{m.subject || m.email}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-400">{new Date(m.created_at).toLocaleDateString("tr-TR")}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
