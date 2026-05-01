"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Check, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedCode = window.localStorage.getItem("discount_code");
    if (savedCode) setDiscountCode(savedCode);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      discountCode: String(fd.get("discountCode") || "").trim().toUpperCase(),
    };
    const finalSubject = payload.discountCode
      ? `${payload.subject || "Teklif Talebi"} [İndirim Kodu: ${payload.discountCode}]`
      : payload.subject;
    try {
      const r = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, subject: finalSubject }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || "Mesaj iletilemedi");
      }
      setState("ok");
      formRef.current?.reset();
      setTimeout(() => setState("idle"), 6000);
    } catch (err: any) {
      setState("err");
      setError(err.message || "Bir hata oluştu.");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        <PremiumField label="Adınız" name="name" placeholder="Adınız Soyadınız" required />
        <PremiumField label="E-posta" name="email" type="email" placeholder="ornek@mail.com" required />
      </div>
      <PremiumField label="Konu" name="subject" placeholder="Projenizden kısaca bahsedin" />
      <PremiumField
        label="İndirim Kodu (varsa)"
        name="discountCode"
        placeholder="OYUN25"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
      />

      <label className="group grid gap-2 text-sm">
        <span className="font-semibold text-brand-ink dark:text-brand-cream">Mesajınız</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Hayalinizdeki projeyi birlikte hayata geçirelim..."
          className="rounded-2xl border border-brand-gold/35 bg-white/80 px-5 py-4 text-brand-ink outline-none transition-all duration-300 placeholder:text-brand-mist/60 focus:border-brand-bronze focus:bg-white focus:shadow-[0_0_0_3px_rgba(184,150,98,0.15)] dark:bg-white/[0.06] dark:text-brand-cream dark:focus:bg-white/10 resize-none"
        />
      </label>

      <div className="flex items-center gap-4">
        <motion.button
          type="submit"
          disabled={state === "loading" || state === "ok"}
          whileHover={state === "idle" ? { scale: 1.03 } : {}}
          whileTap={state === "idle" ? { scale: 0.97 } : {}}
          className={`relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-8 py-4 font-semibold text-white shadow-glow transition-all ${
            state === "ok"
              ? "bg-emerald-500 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]"
              : "btn-primary"
          } disabled:opacity-80`}
        >
          {state === "loading" && <Loader2 size={17} className="animate-spin" />}
          {state === "ok" && <Check size={17} />}
          {state === "idle" && <Send size={17} />}
          {state === "err" && <AlertCircle size={17} />}
          {state === "ok" ? "Mesajınız iletildi!" : state === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}
        </motion.button>

        {state === "idle" && (
          <p className="text-xs text-brand-mist dark:text-brand-cream/50">
            24 saat içinde dönüş yapıyorum.
          </p>
        )}
      </div>

      <AnimatePresence>
        {state === "ok" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-50/80 px-5 py-4 dark:bg-emerald-900/20"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white">
              <Sparkles size={14} />
            </span>
            <div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Teşekkürler!</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Mesajınız alındı. En kısa sürede dönüş yapacağım.</p>
            </div>
          </motion.div>
        )}
        {state === "err" && error && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-50/80 px-4 py-3 text-sm text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
          >
            <AlertCircle size={15} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function PremiumField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="group grid gap-2 text-sm">
      <span className="font-semibold text-brand-ink dark:text-brand-cream">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="rounded-2xl border border-brand-gold/35 bg-white/80 px-5 py-3.5 text-brand-ink outline-none transition-all duration-300 placeholder:text-brand-mist/60 focus:border-brand-bronze focus:bg-white focus:shadow-[0_0_0_3px_rgba(184,150,98,0.15)] dark:bg-white/[0.06] dark:text-brand-cream dark:focus:bg-white/10"
      />
    </label>
  );
}
