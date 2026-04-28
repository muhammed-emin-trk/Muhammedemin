import Link from "next/link";

const links = [
  ["/", "Ana Sayfa"],
  ["/hakkimda", "Hakkımda"],
  ["/projeler", "Projeler"],
  ["/blog", "Blog"],
  ["/iletisim", "İletişim"],
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0E27]/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="font-semibold text-white">Muhammed Emin Türkoğlu</Link>
        <div className="flex gap-4 text-sm text-slate-200">{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</div>
      </nav>
    </header>
  );
}
