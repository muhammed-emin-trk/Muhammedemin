"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, FolderKanban, BookOpen, FileText, Mail,
  Image as ImageIcon, MessageSquareQuote, HelpCircle, Settings, LogOut, Menu, X, Home
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: Mail, accent: true },
  { href: "/admin/projeler", label: "Projeler", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/sayfalar", label: "Sayfalar", icon: FileText },
  { href: "/admin/fotograflar", label: "Fotoğraflar", icon: ImageIcon },
  { href: "/admin/referanslar", label: "Referanslar", icon: MessageSquareQuote },
  { href: "/admin/sss", label: "S.S.S.", icon: HelpCircle },
  { href: "/admin/ayarlar", label: "Site Ayarları", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/40 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed left-4 top-4 z-40 grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white shadow lg:hidden dark:border-slate-700 dark:bg-slate-800"
        aria-label="Menü"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-slate-200 bg-white/95 backdrop-blur transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900/95 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col p-5">
          <div className="mb-6 flex items-center gap-3 px-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 font-display text-sm font-bold text-white shadow-lg">
              ME
            </div>
            <div>
              <p className="text-sm font-semibold">Yönetim Paneli</p>
              <p className="text-xs text-slate-500">muhammedeminturk</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {nav.map((n) => {
              const active = pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href));
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-gradient-to-r from-amber-500/15 to-rose-500/10 font-semibold text-amber-700 dark:text-amber-300"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <n.icon size={18} className={active ? "text-amber-600 dark:text-amber-400" : ""} />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 space-y-1 border-t border-slate-200 pt-4 dark:border-slate-800">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Home size={18} /> Siteyi Görüntüle
            </Link>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <LogOut size={18} /> Çıkış Yap
            </button>
          </div>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl p-5 pt-16 md:p-8 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
