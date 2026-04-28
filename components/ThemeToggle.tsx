"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full border border-slate-300/60 dark:border-slate-700/60" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Tema değiştir"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-slate-300/60 bg-white/70 p-2 text-slate-700 transition hover:scale-105 hover:border-brand-indigo hover:text-brand-indigo dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-200"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
