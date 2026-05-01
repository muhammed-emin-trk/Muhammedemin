"use client";

import { useEffect, useState } from "react";
import {
  BarChart2, Eye, FileText, FolderKanban, Mail, TrendingUp,
  ArrowUp, ArrowDown, Minus, Globe, RefreshCw, Calendar
} from "lucide-react";

type AnalyticsData = {
  totalViews: number;
  uniquePaths: number;
  topPages: { path: string; views: number }[];
  dailyViews: { day: string; views: number }[];
  topReferrers: { referrer: string; count: number }[];
  messages: number;
  projects: number;
  posts: number;
};

const RANGES = [
  { label: "7 Gün", value: "7" },
  { label: "30 Gün", value: "30" },
  { label: "90 Gün", value: "90" },
];

function pathLabel(path: string) {
  if (path === "/") return "Anasayfa";
  return path.replace(/^\//, "").replace(/-/g, " ");
}

function Sparkline({ data }: { data: { day: string; views: number }[] }) {
  if (data.length < 2) return <div className="h-16 text-xs text-slate-400 flex items-center">Yeterli veri yok</div>;
  const max = Math.max(...data.map((d) => Number(d.views)));
  const w = 300;
  const h = 60;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (Number(d.views) / (max || 1)) * (h - 8) - 4;
    return `${x},${y}`;
  });
  const area = `M${pts[0]} L${pts.join(" L")} L${w},${h} L0,${h} Z`;
  const line = `M${pts[0]} L${pts.join(" L")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sg)" />
      <path d={line} stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
      <div
        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [range, setRange] = useState("30");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function load(r = range) {
    setLoading(true);
    const res = await fetch(`/api/admin/analytics?range=${r}`);
    if (res.ok) setData(await res.json());
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => { load(); }, [range]);

  const maxPageViews = Math.max(...(data?.topPages.map((p) => Number(p.views)) ?? [1]));
  const maxReferrer = Math.max(...(data?.topReferrers.map((r) => Number(r.count)) ?? [1]));

  const stats = data
    ? [
        {
          label: "Toplam Sayfa Görüntüleme",
          value: data.totalViews.toLocaleString("tr-TR"),
          icon: Eye,
          color: "from-sky-400 to-blue-600",
          bg: "bg-sky-50 dark:bg-sky-950/30",
        },
        {
          label: "Ziyaret Edilen Sayfa Sayısı",
          value: data.uniquePaths.toLocaleString("tr-TR"),
          icon: Globe,
          color: "from-violet-400 to-purple-600",
          bg: "bg-violet-50 dark:bg-violet-950/30",
        },
        {
          label: "Toplam Mesaj",
          value: data.messages.toLocaleString("tr-TR"),
          icon: Mail,
          color: "from-rose-400 to-pink-600",
          bg: "bg-rose-50 dark:bg-rose-950/30",
        },
        {
          label: "Yayınlanan İçerik",
          value: (data.projects + data.posts).toLocaleString("tr-TR"),
          icon: FolderKanban,
          color: "from-emerald-400 to-teal-600",
          bg: "bg-emerald-50 dark:bg-emerald-950/30",
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Analitik Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Sitenizin trafik ve performans verileri</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Range selector */}
          <div className="flex rounded-xl border border-slate-200 bg-white overflow-hidden dark:border-slate-700 dark:bg-slate-800">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setRange(r.value)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition ${
                  range === r.value
                    ? "bg-amber-500 text-white"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                <Calendar size={11} />
                {r.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setRefreshing(true); load(); }}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
          ))}
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className={`relative overflow-hidden rounded-2xl border border-slate-200 ${s.bg} p-5 dark:border-slate-700`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{s.value}</p>
                  </div>
                  <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white`}>
                    <s.icon size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sparkline chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <BarChart2 size={16} className="text-amber-500" />
                Günlük Sayfa Görüntülemeleri
              </h2>
              <span className="text-xs text-slate-400">Son {range} gün</span>
            </div>
            {data && <Sparkline data={data.dailyViews} />}
            {/* X axis labels */}
            {data && data.dailyViews.length > 0 && (
              <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                <span>{new Date(data.dailyViews[0]?.day).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" })}</span>
                <span>{new Date(data.dailyViews[Math.floor(data.dailyViews.length / 2)]?.day).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" })}</span>
                <span>{new Date(data.dailyViews[data.dailyViews.length - 1]?.day).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" })}</span>
              </div>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top pages */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <h2 className="mb-5 font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp size={16} className="text-amber-500" />
                En Çok Ziyaret Edilen Sayfalar
              </h2>
              {data?.topPages.length === 0 ? (
                <p className="text-sm text-slate-400">Henüz veri yok. Sitenizi ziyaret ettiğinizde veriler burada görünecek.</p>
              ) : (
                <ol className="space-y-3">
                  {data?.topPages.map((p, i) => (
                    <li key={p.path} className="grid gap-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="flex-shrink-0 w-5 text-center text-xs font-bold text-slate-400">{i + 1}</span>
                          <span className="truncate capitalize font-medium text-slate-700 dark:text-slate-300">
                            {pathLabel(p.path)}
                          </span>
                          <span className="flex-shrink-0 text-[10px] text-slate-400">{p.path}</span>
                        </div>
                        <span className="flex-shrink-0 font-semibold text-slate-900 dark:text-slate-100">
                          {Number(p.views).toLocaleString("tr-TR")}
                        </span>
                      </div>
                      <MiniBar value={Number(p.views)} max={maxPageViews} />
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Referrers */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <h2 className="mb-5 font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Globe size={16} className="text-amber-500" />
                Trafik Kaynakları
              </h2>
              {!data?.topReferrers.length ? (
                <p className="text-sm text-slate-400">Henüz dış kaynak trafiği yok.</p>
              ) : (
                <ol className="space-y-3">
                  {data.topReferrers.map((r, i) => {
                    let domain = r.referrer;
                    try { domain = new URL(r.referrer).hostname; } catch {}
                    return (
                      <li key={r.referrer} className="grid gap-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="flex-shrink-0 w-5 text-center text-xs font-bold text-slate-400">{i + 1}</span>
                            <span className="truncate text-slate-700 dark:text-slate-300">{domain}</span>
                          </div>
                          <span className="flex-shrink-0 font-semibold text-slate-900 dark:text-slate-100">
                            {Number(r.count).toLocaleString("tr-TR")}
                          </span>
                        </div>
                        <MiniBar value={Number(r.count)} max={maxReferrer} />
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
