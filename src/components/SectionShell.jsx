"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function SectionShell({ children, prev, next }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col pt-28 pb-8"
    >
      {children}

      <nav className="mx-auto mt-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 pt-12 font-mono text-xs uppercase tracking-wider sm:px-6">
        <div className="flex-1">
          {prev ? (
            <Link href={prev.href} className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent">
              <span className="text-accent">←</span> {prev.label}
            </Link>
          ) : null}
        </div>
        <Link href="/" className="rounded-sm border border-border px-3 py-2 text-muted transition-colors hover:border-accent hover:text-accent">
          ▣ início
        </Link>
        <div className="flex flex-1 justify-end text-right">
          {next ? (
            <Link href={next.href} className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent">
              {next.label} <span className="text-accent">→</span>
            </Link>
          ) : null}
        </div>
      </nav>
    </motion.main>
  );
}
