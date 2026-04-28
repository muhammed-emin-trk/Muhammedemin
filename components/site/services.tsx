export function Services() {
  const services = ["Web Tasarım", "Dijital Pazarlama", "Sağlık Teknolojileri Danışmanlığı"];
  return <section className="mx-auto max-w-6xl px-4"><h2 className="text-3xl font-semibold text-white">Hizmetler</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{services.map((s) => <article key={s} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-100">{s}</article>)}</div></section>;
}
