import Link from "next/link";
export function ContactCta() {
  return (
    <section className="section-container">
      <div className="rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-[#f6ecdd] via-[#f2e3ca] to-[#ecd7b3] p-10">
        <h2 className="text-3xl font-semibold text-brand-ink">Birlikte Değer Üretelim</h2>
        <Link
          className="mt-4 inline-block rounded-xl border border-brand-gold/70 bg-white/90 px-4 py-2 font-medium text-brand-ink transition hover:bg-brand-cream"
          href="/iletisim"
        >
          İletişime Geç
        </Link>
      </div>
    </section>
  );
}
