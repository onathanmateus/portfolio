"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { profile } from "@/data/portfolio";
import { Magnetic } from "./Magnetic";
import { Typewriter } from "./Typewriter";

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
      <motion.div
        {...item(0.05)}
        className="mb-8 grid h-24 w-24 place-items-center rounded-2xl text-2xl font-semibold text-accent-foreground shadow-lg shadow-accent/25"
        style={{ background: "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 55%, #000))" }}
      >
        {initials}
      </motion.div>

      <motion.p {...item(0.12)} className="mono caret mb-4 text-sm font-medium tracking-wide text-accent">
        {profile.role}
      </motion.p>

      <motion.h1
        {...item(0.18)}
        className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl"
      >
        <Typewriter
          as="span"
          trigger="mount"
          startDelay={350}
          speed={70}
          text={profile.name}
          className="shimmer inline-block"
        />
      </motion.h1>

      <motion.p {...item(0.26)} className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
        {profile.tagline}
      </motion.p>

      <motion.div {...item(0.34)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Magnetic>
          <Link
            href="/sobre"
            className="liquid-sheen inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/25 transition-transform active:scale-95"
          >
            Conhecer trajetória
          </Link>
        </Magnetic>
        <Magnetic>
          <Link
            href="/contato"
            className="liquid-glass inline-block rounded-full border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Entrar em contato
          </Link>
        </Magnetic>
      </motion.div>

      <motion.p {...item(0.42)} className="mono mt-12 text-sm text-muted">
        {profile.location}
      </motion.p>
    </main>
  );
}
