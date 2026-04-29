export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-gold/25 bg-brand-cream/85 backdrop-blur-xl">
      <nav className="section-container flex h-16 items-center justify-between">
        <div className="font-semibold tracking-tight text-brand-ink">ME · Muhammed Emin Türkoğlu</div>
        <ul className="hidden gap-6 text-sm text-brand-ink/80 md:flex">
          {["Anasayfa", "Hakkımda", "Projeler", "Blog", "İletişim"].map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <button className="rounded-full border border-brand-gold/60 px-4 py-2 text-sm text-brand-ink">İletişime Geç</button>
      </nav>
    </header>
  );
}
