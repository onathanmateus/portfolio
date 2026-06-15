"use client";

import { motion } from "motion/react";

// Re-monta a cada navegação → anima a entrada de cada página.
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
