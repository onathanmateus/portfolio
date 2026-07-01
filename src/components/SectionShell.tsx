"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
}

export function SectionShell({ children }: SectionShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[100svh] flex-1 flex-col justify-center px-5 pt-28 pb-16 sm:px-6"
    >
      {children}
    </motion.main>
  );
}
