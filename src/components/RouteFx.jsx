"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

// Cortina de transição: varre ao trocar de rota (wipe + scanlines + borda neon).
export function RouteFx() {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{ transformOrigin: "top", background: "#04060a" }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="scanlines absolute inset-0 opacity-40" />
        <div
          className="absolute bottom-0 left-0 h-0.5 w-full"
          style={{ background: "var(--accent)", boxShadow: "0 0 18px var(--glow)" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
