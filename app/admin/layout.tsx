import { AdminShell } from "@/components/admin/admin-shell";
import { LoginGate } from "@/components/admin/login-gate";

export const metadata = { title: "Yönetim Paneli", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <LoginGate>{children}</LoginGate>;
}
