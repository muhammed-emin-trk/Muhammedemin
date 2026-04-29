"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    await new Promise((r) => setTimeout(r, 900));
    setState("ok");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setState("idle"), 4000);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Adınız" name="name" placeholder="Adınız Soyadınız" required />
        <Field label="E-posta" name="email" type="email" placeholder="ornek@mail.com" required />
      </div>
      <Field label="Konu" name="subject" placeholder="Projenizden bahsedin" required />
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-brand-ink dark:text-brand-cream">Mesajınız</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Hayalinizdeki projeyi birlikte hayata geçirelim..."
          className="rounded-2xl border border-brand-gold/40 bg-white/80 px-4 py-3 text-brand-ink outline-none transition placeholder:text-brand-mist focus:border-brand-bronze focus:ring-2 focus:ring-brand-gold/30 dark:bg-white/5 dark:text-brand-cream"
        />
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-primary mt-2 self-start disabled:opacity-70"
      >
        {state === "loading" ? <Loader2 size={16} className="animate-spin" /> : state === "ok" ? <Check size={16} /> : <Send size={16} />}
        {state === "ok" ? "Mesajınız iletildi" : state === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}
      </button>

      {state === "ok" && (
        <p className="text-sm text-brand-bronze">Teşekkürler! 24 saat içinde dönüş yapacağım.</p>
      )}
    </form>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-brand-ink dark:text-brand-cream">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-2xl border border-brand-gold/40 bg-white/80 px-4 py-3 text-brand-ink outline-none transition placeholder:text-brand-mist focus:border-brand-bronze focus:ring-2 focus:ring-brand-gold/30 dark:bg-white/5 dark:text-brand-cream"
      />
    </label>
  );
}
