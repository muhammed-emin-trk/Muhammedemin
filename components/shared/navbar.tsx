export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-ink/70 backdrop-blur-xl">
      <nav className="section-container flex h-16 items-center justify-between">
        <div className="font-semibold tracking-tight">ME · Muhammed Emin Türkoğlu</div>
        <ul className="hidden gap-6 text-sm md:flex">
          {['Anasayfa','Hakkımda','Projeler','Blog','İletişim'].map((i)=><li key={i}>{i}</li>)}
        </ul>
        <button className="rounded-full border border-white/20 px-4 py-2 text-sm">İletişime Geç</button>
      </nav>
    </header>
  );
}
