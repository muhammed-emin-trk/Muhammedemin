import { Github, Instagram, Linkedin } from "lucide-react";

const socials = [
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 py-8 dark:border-slate-800/80">
      <div className="section-container flex flex-col items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-300 sm:flex-row">
        <p>© {new Date().getFullYear()} Muhammed Emin Türkoğlu. Tüm hakları saklıdır.</p>
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="rounded-full border border-slate-300/70 p-2 transition hover:border-brand-indigo hover:text-brand-indigo dark:border-slate-700"
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
