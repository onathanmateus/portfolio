"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface NavTarget {
  href: string;
  label: string;
}

interface SectionShellProps {
  children: ReactNode;
  prev?: NavTarget;
  next?: NavTarget;
}

export function SectionShell({ children, prev, next }: SectionShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col px-5 pt-28 pb-10 sm:px-6"
    >
      {children}

      <nav className="mx-auto mt-16 flex w-full max-w-5xl items-center justify-between gap-4 border-t border-border pt-8 text-sm">
        <div className="flex-1">
          {prev ? (
            <Link
              href={prev.href}
              className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
              {prev.label}
            </Link>
          ) : null}
        </div>

        <Link
          href="/"
          className="rounded-full border border-border px-4 py-2 text-muted transition-colors hover:border-accent hover:text-accent"
        >
          Início
        </Link>

        <div className="flex flex-1 justify-end text-right">
          {next ? (
            <Link
              href={next.href}
              className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
            >
              {next.label}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          ) : null}
        </div>
      </nav>
    </motion.main>
  );
}
