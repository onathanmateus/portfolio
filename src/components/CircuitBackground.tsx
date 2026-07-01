"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

// Fundo temático de "linhas de comunicação de chip": traços ortogonais de
// circuito com pulsos de luz que viajam por eles. Canvas 2D (leve, roda no
// celular e no desktop). Funciona no tema claro e escuro. Pausa com
// prefers-reduced-motion e quando a aba fica oculta.

interface Pt {
  x: number;
  y: number;
}
interface Trace {
  pts: Pt[];
  cum: number[];
  total: number;
}
interface Pulse {
  ti: number;
  dist: number;
  speed: number;
}

type Colors = { line: string; pad: string; pulse: string; pulseSoft: string };

function colorsFor(theme: string | null): Colors {
  if (theme === "light") {
    return {
      line: "rgba(10,109,255,0.13)",
      pad: "rgba(10,109,255,0.28)",
      pulse: "#0a6dff",
      pulseSoft: "rgba(10,109,255,0.0)",
    };
  }
  return {
    line: "rgba(90,165,255,0.16)",
    pad: "rgba(120,185,255,0.32)",
    pulse: "#8ec5ff",
    pulseSoft: "rgba(142,197,255,0.0)",
  };
}

function pointAt(tr: Trace, dist: number): Pt {
  const d = Math.max(0, Math.min(dist, tr.total));
  let i = 0;
  while (i < tr.cum.length - 1 && tr.cum[i + 1] < d) i++;
  const a = tr.pts[i];
  const b = tr.pts[i + 1] ?? a;
  const segLen = tr.cum[i + 1] - tr.cum[i] || 1;
  const t = (d - tr.cum[i]) / segLen;
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const colorsRef = useRef<Colors>(colorsFor(null));

  useEffect(() => {
    colorsRef.current = colorsFor(theme);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let W = 0;
    let H = 0;
    let dpr = 1;
    const G = 46; // tamanho da célula do grid

    const rnd = (n: number) => Math.floor(Math.random() * n);

    const buildTraces = () => {
      traces = [];
      const cols = Math.floor(W / G);
      const rows = Math.floor(H / G);
      if (cols < 2 || rows < 2) return;
      const count = Math.max(10, Math.min(60, Math.round((W * H) / 26000)));
      for (let n = 0; n < count; n++) {
        const pts: Pt[] = [];
        let cx = rnd(cols);
        let cy = rnd(rows);
        pts.push({ x: cx * G, y: cy * G });
        const steps = 3 + rnd(6);
        let lastDir = -1;
        for (let s = 0; s < steps; s++) {
          const dirs = [0, 1, 2, 3].filter((d) => d !== (lastDir ^ 1) || lastDir === -1);
          const dir = dirs[rnd(dirs.length)];
          const len = 1 + rnd(3);
          if (dir === 0) cx = Math.min(cols, cx + len);
          else if (dir === 1) cx = Math.max(0, cx - len);
          else if (dir === 2) cy = Math.min(rows, cy + len);
          else cy = Math.max(0, cy - len);
          lastDir = dir;
          const last = pts[pts.length - 1];
          const np = { x: cx * G, y: cy * G };
          if (np.x !== last.x || np.y !== last.y) pts.push(np);
        }
        if (pts.length < 2) continue;
        const cum = [0];
        let total = 0;
        for (let i = 1; i < pts.length; i++) {
          total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
          cum.push(total);
        }
        traces.push({ pts, cum, total });
      }

      const pcount = Math.max(6, Math.min(22, Math.round(traces.length / 2.5)));
      pulses = [];
      for (let i = 0; i < pcount; i++) {
        pulses.push({
          ti: rnd(traces.length),
          dist: Math.random() * (traces[rnd(traces.length)]?.total || 100),
          speed: 45 + Math.random() * 70,
        });
      }
    };

    const drawStatic = () => {
      const c = colorsRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = c.line;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (const tr of traces) {
        ctx.beginPath();
        ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
        ctx.stroke();
      }
      // pads nas extremidades
      ctx.fillStyle = c.pad;
      for (const tr of traces) {
        for (const p of [tr.pts[0], tr.pts[tr.pts.length - 1]]) {
          ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
        }
      }
      ctx.restore();
    };

    // Camada estática desenhada num canvas offscreen p/ blitar a cada frame.
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");

    const rebuildStaticLayer = () => {
      off.width = canvas.width;
      off.height = canvas.height;
      if (!offCtx) return;
      const c = colorsRef.current;
      offCtx.clearRect(0, 0, off.width, off.height);
      offCtx.save();
      offCtx.scale(dpr, dpr);
      offCtx.lineWidth = 1.2;
      offCtx.strokeStyle = c.line;
      offCtx.lineJoin = "round";
      offCtx.lineCap = "round";
      for (const tr of traces) {
        offCtx.beginPath();
        offCtx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let i = 1; i < tr.pts.length; i++) offCtx.lineTo(tr.pts[i].x, tr.pts[i].y);
        offCtx.stroke();
      }
      offCtx.fillStyle = c.pad;
      for (const tr of traces) {
        for (const p of [tr.pts[0], tr.pts[tr.pts.length - 1]]) {
          offCtx.fillRect(p.x - 2, p.y - 2, 4, 4);
        }
      }
      offCtx.restore();
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      buildTraces();
      rebuildStaticLayer();
    };
    resize();
    window.addEventListener("resize", resize);

    const TAIL = 26;
    let raf = 0;
    let running = true;
    let prev = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const c = colorsRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (offCtx) ctx.drawImage(off, 0, 0);

      ctx.save();
      ctx.scale(dpr, dpr);
      for (const p of pulses) {
        const tr = traces[p.ti];
        if (!tr) continue;
        p.dist += p.speed * dt;
        if (p.dist - TAIL > tr.total) {
          p.ti = rnd(traces.length);
          p.dist = 0;
          p.speed = 45 + Math.random() * 70;
          continue;
        }
        const head = pointAt(tr, p.dist);
        const tail = pointAt(tr, p.dist - TAIL);
        const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        grad.addColorStop(0, c.pulseSoft);
        grad.addColorStop(1, c.pulse);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.stroke();

        ctx.fillStyle = c.pulse;
        ctx.shadowColor = c.pulse;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      if (running) raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        running = true;
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Redesenha a camada estática ao trocar de tema (cor das linhas/pads).
    let themeTimer = 0;
    const themeObserver = new MutationObserver(() => {
      clearTimeout(themeTimer);
      themeTimer = window.setTimeout(() => {
        colorsRef.current = colorsFor(
          document.documentElement.classList.contains("dark") ? "dark" : "light",
        );
        rebuildStaticLayer();
        if (reduce) drawStatic();
      }, 50);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      clearTimeout(themeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
