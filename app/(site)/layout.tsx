import { SiteShell } from "@/components/shared/site-shell";
import { getNavPages } from "@/lib/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const navPages = await getNavPages();
  const extra = navPages.map((p) => ({ href: `/sayfa/${p.slug}`, label: p.title }));
  return <SiteShell extraLinks={extra}>{children}</SiteShell>;
}
