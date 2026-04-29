export function Services() {
  const services = ["Web Tasarım", "Dijital Pazarlama", "Sağlık Teknolojileri Danışmanlığı"];
  return (
    <section className="section-container">
      <h2 className="text-3xl font-semibold text-brand-ink">Hizmetler</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {services.map((s) => (
          <article key={s} className="glass-card p-5 text-brand-ink/85">
            {s}
          </article>
        ))}
      </div>
    </section>
  );
}
