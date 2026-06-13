"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { profile, contact } from "@/data/portfolio";
import { Circuit } from "./Circuit";
import { GlitchText } from "./GlitchText";

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

  // Parallax do avatar conforme a posição do mouse.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const avatarX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const avatarY = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const circuitX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const circuitY = useTransform(sy, [-0.5, 0.5], [12, -12]);

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
      className="relative overflow-hidden border-b border-border"
    >
      {/* Circuito vivo de fundo */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          x: circuitX,
          y: circuitY,
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, #000 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, #000 35%, transparent 80%)",
        }}
        aria-hidden="true"
      >
        <Circuit variant="hero" count={20} seed={42} className="h-full w-full" />
      </motion.div>

      {/* Brilho ambiente atrás do conteúdo */}
      <div
        className="pointer-events-none absolute left-1/2 top-[8%] -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow), transparent 60%)", opacity: 0.5 }}
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-20 pt-36 text-center sm:px-6 sm:pt-44">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          {/* Avatar com parallax + anel neon */}
          <motion.div variants={item} className="relative mb-8" style={{ x: avatarX, y: avatarY }}>
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-accent-soft to-accent opacity-80 blur-md" aria-hidden="true" />
            <div className="relative grid h-28 w-28 place-items-center rounded-full border border-accent/60 bg-surface font-display text-3xl font-bold text-gradient sm:h-32 sm:w-32">
              NM
            </div>
          </motion.div>

          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-sm border border-border bg-surface/70 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Disponível para novos desafios
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold uppercase tracking-tight neon-text sm:text-6xl"
          >
            <GlitchText>{profile.name}</GlitchText>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-accent-soft sm:text-base"
          >
            {profile.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contato"
              className="rounded-sm border border-accent bg-accent/10 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-accent transition-all hover:bg-accent hover:text-[#04060a]"
              style={{ boxShadow: "0 0 20px -6px var(--glow)" }}
            >
              Entre em contato
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-border bg-surface/70 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-border bg-surface/70 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
