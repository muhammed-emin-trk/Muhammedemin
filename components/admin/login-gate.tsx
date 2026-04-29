"use client";

import { usePathname } from "next/navigation";
import { AdminShell } from "./admin-shell";

export function LoginGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">{children}</div>;
  }
  return <AdminShell>{children}</AdminShell>;
}
