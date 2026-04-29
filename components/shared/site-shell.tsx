"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { CursorGlow } from "./cursor-glow";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-gradient-to-r from-brand-bronze via-brand-gold to-brand-copper"
    />
  );
}

function NoiseOverlay() {
  return <div aria-hidden className="noise-overlay pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-multiply hidden md:block" />;
}

function AmbientBlobs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[0] hidden overflow-hidden md:block">
      <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-brand-gold/30 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-brand-copper/25 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-brand-violet/15 blur-3xl animate-blob [animation-delay:-12s]" />
    </div>
  );
}

type Extra = { href: string; label: string };

export function SiteShell({ children, extraLinks }: { children: React.ReactNode; extraLinks?: Extra[] }) {
  return (
    <div className="relative">
      <CursorGlow />
      <AmbientBlobs />
      <NoiseOverlay />
      <ScrollProgress />
      <div className="relative z-[2]">
        <Navbar extraLinks={extraLinks} />
        {children}
        <Footer />
      </div>
    </div>
  );
}
