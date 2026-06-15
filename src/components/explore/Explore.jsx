"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SECTIONS, ARENA } from "./TronScene";
import { useTronAudio } from "./useTronAudio";

const TronScene = dynamic(() => import("./TronScene"), { ssr: false, loading: () => null });

const KEYMAP = {
  ArrowUp: "forward",
  KeyW: "forward",
  ArrowDown: "back",
  KeyS: "back",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

// Minimapa: lê a telemetria por rAF e move o marcador da moto.
function Minimap({ telemetryRef, active }) {
  const SIZE = 150;
  const pad = 12;
  const scale = (SIZE - pad * 2) / (ARENA * 2);
  const toX = (x) => SIZE / 2 + x * scale;
  const toY = (z) => SIZE / 2 + z * scale;
  const dot = useRef(null);
  const line = useRef(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = telemetryRef.current;
      const cx = toX(t.x), cy = toY(t.z);
      const ex = cx + Math.sin(t.heading) * 9, ey = cy + Math.cos(t.heading) * 9;
      if (dot.current) {
        dot.current.setAttribute("cx", cx);
        dot.current.setAttribute("cy", cy);
        dot.current.setAttribute("opacity", t.dead ? "0.2" : "1");
      }
      if (line.current) {
        line.current.setAttribute("x1", cx);
        line.current.setAttribute("y1", cy);
        line.current.setAttribute("x2", ex);
        line.current.setAttribute("y2", ey);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg width={SIZE} height={SIZE} className="rounded-sm border border-border bg-surface/60 backdrop-blur-md" viewBox={`0 0 ${SIZE} ${SIZE}`}>
      <rect x={pad} y={pad} width={SIZE - pad * 2} height={SIZE - pad * 2} fill="none" stroke="var(--border)" />
      {SECTIONS.map((s) => (
        <g key={s.id}>
          <circle cx={toX(s.pos[0])} cy={toY(s.pos[2])} r={active === s.id ? 5 : 3.5} fill={active === s.id ? "#fff" : "var(--accent)"} />
        </g>
      ))}
      <line ref={line} stroke="var(--accent)" strokeWidth="2" />
      <circle ref={dot} r="3.5" fill="#fff" />
    </svg>
  );
}

export function Explore() {
  const router = useRouter();
  const { enabled, toggle, setSpeed, playDeath } = useTronAudio();
  const [eligible, setEligible] = useState(null);
  const [active, setActive] = useState(null);
  const [dead, setDead] = useState(false);
  const keysRef = useRef({ forward: false, back: false, left: false, right: false });
  const activeRef = useRef(null);
  const telemetryRef = useRef({ x: 0, z: 0, heading: Math.PI, speed: 0, dead: false });

  const enter = useCallback((route) => route && router.push(route), [router]);

  const onActive = useCallback((id) => {
    activeRef.current = id;
    setActive(id);
  }, []);

  const onDeath = useCallback(() => {
    playDeath();
    setDead(true);
    setTimeout(() => setDead(false), 1100);
  }, [playDeath]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches && window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado externo (media queries)
    setEligible(fine && !reduce);
  }, []);

  // Teclado
  useEffect(() => {
    if (!eligible) return;
    const down = (e) => {
      const m = KEYMAP[e.code];
      if (m) {
        keysRef.current[m] = true;
        e.preventDefault();
      }
      if ((e.code === "Enter" || e.code === "KeyE") && activeRef.current) enter(activeRef.current);
    };
    const up = (e) => {
      const m = KEYMAP[e.code];
      if (m) keysRef.current[m] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [eligible, enter]);

  // rAF para alimentar o som com a velocidade
  useEffect(() => {
    if (!eligible) return;
    let raf = 0;
    const tick = () => {
      setSpeed(telemetryRef.current.speed);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [eligible, setSpeed]);

  if (eligible === null) return <div className="fixed inset-0 bg-[#04060a]" />;

  if (!eligible) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-[#04060a] px-6 text-center">
        <p className="font-display text-2xl font-bold uppercase tracking-tight neon-text">Exploração 3D</p>
        <p className="max-w-sm font-mono text-sm text-muted">
          A pilotagem da moto de luz exige teclado e roda melhor no desktop. Abra no computador — ou navegue pelo site normalmente.
        </p>
        <Link href="/" className="rounded-sm border border-accent bg-accent/10 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-white dark:hover:text-[#04060a]">
          ← Voltar ao site
        </Link>
      </div>
    );
  }

  const activeSection = SECTIONS.find((s) => s.id === active);

  return (
    <div className="fixed inset-0 bg-[#04060a]">
      <TronScene keysRef={keysRef} onActive={onActive} telemetryRef={telemetryRef} onDeath={onDeath} active={active} />

      {/* Flash de morte */}
      {dead ? (
        <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center" style={{ background: "radial-gradient(circle, rgba(255,40,80,0.25), rgba(255,40,80,0.05))" }}>
          <span className="scanlines absolute inset-0 opacity-40" />
          <span className="font-display text-xl font-bold uppercase tracking-widest text-red-300">colisão · reiniciando…</span>
        </div>
      ) : null}

      {/* HUD topo */}
      <div className="fixed left-5 top-5 z-10 flex items-center gap-2">
        <Link href="/" className="rounded-sm border border-border bg-surface/70 px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground backdrop-blur-md transition-colors hover:border-accent hover:text-accent">
          ← Sair
        </Link>
        <button
          type="button"
          onClick={toggle}
          aria-label={enabled ? "Desligar som" : "Ligar som"}
          className={`grid h-9 w-9 place-items-center rounded-sm border bg-surface/70 backdrop-blur-md transition-colors ${enabled ? "border-accent text-accent" : "border-border text-muted hover:text-accent"}`}
        >
          {enabled ? <SoundOn /> : <SoundOff />}
        </button>
      </div>

      {/* Minimapa */}
      <div className="fixed right-5 top-5 z-10">
        <Minimap telemetryRef={telemetryRef} active={active} />
      </div>

      {/* HUD base */}
      <div className="pointer-events-none fixed bottom-5 left-1/2 z-10 -translate-x-1/2 text-center">
        {activeSection ? (
          <button
            type="button"
            onClick={() => enter(activeSection.id)}
            className="pointer-events-auto animate-pulse rounded-sm border border-accent bg-accent/15 px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-accent backdrop-blur-md"
            style={{ boxShadow: "0 0 24px -6px var(--glow)" }}
          >
            ▶ Entrar em {activeSection.label} <span className="opacity-70">(E)</span>
          </button>
        ) : (
          <p className="rounded-sm border border-border bg-surface/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted backdrop-blur-md">
            <span className="text-accent">WASD</span> / setas para pilotar · não toque no seu rastro · chegue num portal
          </p>
        )}
      </div>
    </div>
  );
}

function SoundOn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
    </svg>
  );
}
function SoundOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="m23 9-6 6M17 9l6 6" />
    </svg>
  );
}
