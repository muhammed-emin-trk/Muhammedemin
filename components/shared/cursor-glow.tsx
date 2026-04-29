"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 200, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 24, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-soft-light"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(closest-side, rgba(184,150,98,0.35), rgba(199,127,79,0.15) 40%, transparent 70%)",
      }}
    />
  );
}
