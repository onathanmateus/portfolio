"use client";

import { motion } from "motion/react";

const PANELS = 7;

// Transição "shutter": painéis verticais cobrem a tela e se recolhem em
// cascata revelando a página, com borda neon e um flash glitch.
// Re-monta a cada navegação (via template.js), então toca em toda troca.
export function PageShutter() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      {/* Painéis */}
      <div className="flex h-full w-full">
        {Array.from({ length: PANELS }).map((_, i) => (
          <motion.div
            key={i}
            className="relative h-full flex-1 bg-[#06080e]"
            style={{ transformOrigin: "top" }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.08 + i * 0.05,
            }}
          >
            <span
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ background: "var(--accent)", boxShadow: "0 0 14px var(--glow)" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Flash glitch (scanlines + corte RGB) no início da transição */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="scanlines absolute inset-0 opacity-60" />
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          style={{ background: "linear-gradient(90deg, rgba(255,0,80,0.12), transparent, rgba(34,211,238,0.14))" }}
          initial={{ x: -8 }}
          animate={{ x: 8 }}
          transition={{ duration: 0.3, repeat: 1, repeatType: "mirror" }}
        />
      </motion.div>
    </div>
  );
}
