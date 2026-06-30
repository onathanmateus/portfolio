"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { profile } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

function item(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

export function Hero() {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      {/* brilho suave de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 35%, transparent), transparent 70%)" }}
      />

      <motion.div
        {...item(0.05)}
        className="mb-8 grid h-24 w-24 place-items-center rounded-full text-2xl font-semibold text-accent-foreground shadow-lg"
        style={{ background: "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 60%, #000))" }}
      >
        {initials}
      </motion.div>

      <motion.p {...item(0.12)} className="mb-4 text-sm font-semibold tracking-wide text-accent">
        {profile.role}
      </motion.p>

      <motion.h1
        {...item(0.18)}
        className="text-gradient max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl"
      >
        {profile.name}
      </motion.h1>

      <motion.p {...item(0.26)} className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
        {profile.tagline}
      </motion.p>

      <motion.div {...item(0.34)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/sobre"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03] active:scale-95"
        >
          Conhecer trajetória
        </Link>
        <Link
          href="/contato"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Entrar em contato
        </Link>
      </motion.div>

      <motion.p {...item(0.42)} className="mt-12 text-sm text-muted">
        {profile.location}
      </motion.p>
    </main>
  );
}
