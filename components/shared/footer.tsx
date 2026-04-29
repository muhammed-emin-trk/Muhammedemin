export function Footer() {
  return (
    <footer className="border-t border-brand-gold/25 py-16">
      <div className="section-container grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-2xl font-medium text-brand-ink">Muhammed Emin Türkoğlu</p>
          <p className="mt-3 text-sm text-brand-ink/75">Hemşire, yazılım geliştirici ve dijital stratejist.</p>
        </div>
        <div>
          <p className="mb-3 font-medium text-brand-ink">Hızlı Linkler</p>
          <p className="text-brand-ink/75">Anasayfa · Hakkımda · Projeler · Blog</p>
        </div>
        <div>
          <p className="mb-3 font-medium text-brand-ink">İletişim</p>
          <p className="text-brand-ink/75">muhammedemin@example.com</p>
        </div>
      </div>
    </footer>
  );
}
