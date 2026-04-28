"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-gradient-to-r from-brand-electric via-brand-mint to-brand-violet" />;
}

export function NoiseOverlay() {
  return <div className="noise-overlay pointer-events-none fixed inset-0 z-[1] opacity-[0.03]" />;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <NoiseOverlay />
      {children}
    </>
  );
}
