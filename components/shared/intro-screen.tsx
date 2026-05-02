"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

const ROLES = ["Hemşire", "Yazılım Geliştirici", "Fotoğrafçı", "Gönüllü"];

function FloatingStar({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-brand-gold"
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
        y: [0, -40, -80],
      }}
      transition={{ delay, duration: 3.5, repeat: Infinity, repeatDelay: Math.random() * 3 }}
    />
  );
}

function CounterNum({ to, delay }: { to: number; delay: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v).toLocaleString("tr-TR"));
  useEffect(() => {
    const controls = animate(count, to, { duration: 1.8, delay, ease: "easeOut" });
    return controls.stop;
  }, []);
  return <motion.span>{rounded}</motion.span>;
}

const stars = Array.from({ length: 18 }, (_, i) => ({
  delay: i * 0.22,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1.5,
}));

export function IntroScreen() {
  const [show, setShow]       = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("intro_seen");
    if (!seen) {
      setShow(true);
      sessionStorage.setItem("intro_seen", "1");
    }
  }, []);

  // Auto-close after 5.5 s
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 5500);
    return () => clearTimeout(t);
  }, [show]);

  // Role switcher
  useEffect(() => {
    if (!show) return;
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 1200);
    return () => clearInterval(id);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          style={{ background: "linear-gradient(135deg, #0d0b07 0%, #15110b 35%, #1c1610 60%, #221b13 85%, #0d0b07 100%)" }}
          onClick={() => setShow(false)}
        >
          {/* ── Floating particles ─────────────── */}
          {stars.map((s, i) => <FloatingStar key={i} {...s} />)}

          {/* ── Large ambient blobs ─────────────── */}
          <motion.div
            className="pointer-events-none absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(184,150,98,0.18), transparent 70%)" }}
            animate={{ scale: [1, 1.25, 1], rotate: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(160,112,64,0.15), transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], rotate: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(184,150,98,0.08), transparent 70%)" }}
            animate={{ scale: [1, 2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* ── Decorative ring ─────────────────── */}
          <motion.div
            className="pointer-events-none absolute h-[500px] w-[500px] rounded-full"
            style={{ border: "1px solid rgba(184,150,98,0.12)" }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.1, 1], opacity: [0, 0.6, 0.15] }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="pointer-events-none absolute h-[700px] w-[700px] rounded-full"
            style={{ border: "1px solid rgba(184,150,98,0.07)" }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.05, 1], opacity: [0, 0.4, 0.08] }}
            transition={{ duration: 2.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ── Main content ────────────────────── */}
          <div className="relative flex flex-col items-center gap-7 px-6 text-center">

            {/* Logo badge */}
            <motion.div
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.1 }}
              className="relative"
            >
              <div
                className="grid h-32 w-32 place-items-center rounded-[36px] font-display text-5xl font-black text-white"
                style={{
                  background: "linear-gradient(135deg, #c8a96e 0%, #d7bc8f 40%, #b89662 70%, #8b6f3e 100%)",
                  boxShadow: "0 0 0 1px rgba(184,150,98,0.3), 0 0 60px rgba(184,150,98,0.5), 0 0 120px rgba(184,150,98,0.2)",
                }}
              >
                ME
              </div>
              {/* Outer glow ring 1 */}
              <motion.div
                className="absolute inset-0 rounded-[36px]"
                style={{ border: "2px solid rgba(184,150,98,0.7)" }}
                animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
              />
              {/* Outer glow ring 2 */}
              <motion.div
                className="absolute inset-0 rounded-[36px]"
                style={{ border: "1px solid rgba(184,150,98,0.4)" }}
                animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
              />
            </motion.div>

            {/* Name */}
            <div className="flex flex-col items-center gap-1 overflow-hidden">
              <motion.h1
                initial={{ y: 50, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl font-semibold text-white md:text-6xl"
              >
                Muhammed Emin
              </motion.h1>
              <motion.h1
                initial={{ y: 50, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl font-bold italic md:text-6xl"
                style={{
                  background: "linear-gradient(90deg, #b89662 0%, #d7bc8f 50%, #c8a96e 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Türkoğlu
              </motion.h1>
            </div>

            {/* Animated role switcher */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="h-7 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-center text-sm font-medium uppercase tracking-[0.35em] text-white/60"
                >
                  {ROLES[roleIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur"
            >
              {[
                { value: 1500, suffix: "+", label: "Hasta" },
                { value: 30, suffix: "+", label: "Proje" },
                { value: 6, suffix: " yıl", label: "Deneyim" },
              ].map((s, i) => (
                <div key={s.label} className="flex flex-col items-center gap-0.5">
                  <span className="font-display text-2xl font-black text-white">
                    <CounterNum to={s.value} delay={1.6 + i * 0.15} />
                    <span className="text-brand-gold">{s.suffix}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="w-56 overflow-hidden rounded-full"
              style={{ height: 2, background: "rgba(255,255,255,0.1)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.9, duration: 3.2, ease: "easeInOut" }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #8b6f3e, #b89662, #d7bc8f, #b89662)" }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 2.2 }}
              className="text-xs tracking-widest text-white/40"
            >
              DOKUNARAK GEÇ
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
