"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { profile, contact } from "@/data/portfolio";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const sectionRef = useRef(null);

  // Parallax do avatar conforme a posição do mouse (-0.5 a 0.5 nos eixos).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const avatarX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const avatarY = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const glowX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const glowY = useTransform(sy, [-0.5, 0.5], [14, -14]);

  function handleMove(e) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative overflow-hidden"
    >
      {/* Fundo: aurora animada (no lugar da grade comum) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="aurora-blob h-[34rem] w-[34rem] opacity-40 dark:opacity-50"
          style={{
            left: "8%",
            top: "-8rem",
            background: "radial-gradient(circle, var(--accent-soft), transparent 62%)",
            animation: "aurora-a 22s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob h-[30rem] w-[30rem] opacity-35 dark:opacity-45"
          style={{
            right: "4%",
            top: "-4rem",
            background: "radial-gradient(circle, #3b82f6, transparent 62%)",
            animation: "aurora-b 26s ease-in-out infinite",
          }}
        />
        <motion.div
          className="aurora-blob h-[26rem] w-[26rem] opacity-30 dark:opacity-40"
          style={{
            left: "50%",
            top: "2rem",
            marginLeft: "-13rem",
            x: glowX,
            y: glowY,
            background: "radial-gradient(circle, var(--accent), transparent 60%)",
            animation: "aurora-c 19s ease-in-out infinite",
          }}
        />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-20 pt-36 text-center sm:px-6 sm:pt-44">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          {/* Avatar (placeholder até a foto) — com parallax */}
          <motion.div variants={item} className="relative mb-8" style={{ x: avatarX, y: avatarY }}>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent-soft to-blue-500 opacity-70 blur-md" aria-hidden="true" />
            <div className="relative grid h-28 w-28 place-items-center rounded-full border border-border bg-surface font-mono text-3xl font-semibold text-gradient sm:h-32 sm:w-32">
              NM
            </div>
          </motion.div>

          <motion.span
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Disponível para novos desafios
          </motion.span>

          <motion.h1
            variants={item}
            className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p variants={item} className="mt-3 text-lg font-medium text-gradient sm:text-xl">
            {profile.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contato"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "0 16px 40px -16px var(--glow)" }}
            >
              Entre em contato
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
