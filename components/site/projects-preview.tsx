import Link from "next/link";
export function ProjectsPreview() {
  return (
    <section className="section-container">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-3xl font-semibold text-brand-ink">Öne Çıkan Projeler</h2>
        <Link className="text-sm font-medium text-brand-ink underline decoration-brand-gold/70 underline-offset-4" href="/projeler">
          Tümünü Gör
        </Link>
      </div>
    </section>
  );
}
