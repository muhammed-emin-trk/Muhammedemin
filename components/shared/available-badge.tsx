"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function AvailableBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3.5, type: "spring", stiffness: 200, damping: 22 }}
      className="fixed bottom-20 right-6 z-40 hidden md:block"
    >
      <Link
        href="/iletisim"
        className="group flex items-center gap-2.5 rounded-full border border-brand-gold/30 bg-white/90 px-4 py-2.5 shadow-glass backdrop-blur transition-all hover:-translate-y-1 hover:shadow-glow dark:bg-brand-ink/80"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-semibold text-brand-ink dark:text-brand-cream">
          Yeni projelere açık
        </span>
      </Link>
    </motion.div>
  );
}
