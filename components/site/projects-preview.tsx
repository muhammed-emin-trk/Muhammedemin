import Link from "next/link";
export function ProjectsPreview() {
  return <section className="mx-auto max-w-6xl px-4"><div className="mb-6 flex items-center justify-between"><h2 className="text-3xl font-semibold text-white">Öne Çıkan Projeler</h2><Link className="text-cyan-300" href="/projeler">Tümünü Gör</Link></div></section>;
}
