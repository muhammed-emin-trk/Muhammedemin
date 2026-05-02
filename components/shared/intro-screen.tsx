"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("intro_seen");
    if (!seen) {
      setShow(true);
      sessionStorage.setItem("intro_seen", "1");
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #15110b 0%, #1c1610 40%, #221b13 70%, #15110b 100%)",
          }}
          onClick={() => setShow(false)}
        >
          {/* Ambient orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-bronze/30 blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-gold/20 blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Logo circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
              className="relative"
            >
              <div
                className="grid h-28 w-28 place-items-center rounded-[32px] font-display text-4xl font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #b89662 0%, #d7bc8f 50%, #a07040 100%)",
                  boxShadow: "0 0 80px rgba(184,150,98,0.4), 0 0 160px rgba(184,150,98,0.15)",
                }}
              >
                ME
              </div>
              {/* Ring pulse */}
              <motion.div
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                className="absolute inset-0 rounded-[32px]"
                style={{ border: "2px solid rgba(184,150,98,0.6)" }}
              />
            </motion.div>

            {/* Name */}
            <div className="flex flex-col items-center gap-1 overflow-hidden">
              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-semibold text-white md:text-5xl"
              >
                Muhammed Emin
              </motion.p>
              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-semibold md:text-5xl"
                style={{
                  background: "linear-gradient(90deg, #b89662, #d7bc8f, #b89662)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Türkoğlu
              </motion.p>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-center text-sm tracking-[0.3em] uppercase text-white/50"
            >
              Hemşire · Yazılımcı · Fotoğrafçı
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="w-48 overflow-hidden rounded-full bg-white/10"
              style={{ height: 2 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1.6, ease: "easeInOut" }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #b89662, #d7bc8f)" }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5 }}
              className="text-xs text-white/40"
            >
              Devam etmek için dokun
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
