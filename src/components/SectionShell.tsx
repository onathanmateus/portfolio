"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
}

// Container que preenche a altura disponível (entre navbar e rodapé). As
// seções internas usam flex-1 para esticar o conteúdo e ocupar a tela.
export function SectionShell({ children }: SectionShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-full flex-1 flex-col px-5 pt-10 pb-14 sm:px-6"
    >
      {children}
    </motion.div>
  );
}
