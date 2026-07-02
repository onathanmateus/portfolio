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
  // Padrão fixo em coordenadas normalizadas (0..1). O desenho é definido uma
  // única vez; ao redimensionar só reescalamos para pixels — nunca sorteamos
  // de novo.
  npts: Pt[];
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

// Pontos do rastro entre d0 e d1 SEGUINDO o traço (inclui os vértices das
// curvas no meio) — para o rastro acompanhar as dobras em vez de cortar reto.
function tailPoints(tr: Trace, d0: number, d1: number): Pt[] {
  const a = Math.max(0, d0);
  const b = Math.min(tr.total, d1);
  const pts: Pt[] = [pointAt(tr, a)];
  for (let i = 0; i < tr.cum.length; i++) {
    if (tr.cum[i] > a && tr.cum[i] < b) pts.push(tr.pts[i]);
  }
  pts.push(pointAt(tr, b));
  return pts;
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

    // Sorteia o PADRÃO uma única vez, guardando os pontos normalizados (0..1).
    // A densidade/quantidade é decidida no tamanho inicial e mantida — assim o
    // desenho não muda quando a janela é redimensionada.
    const buildPattern = () => {
      traces = [];
      const cols = Math.floor(W / G);
      const rows = Math.floor(H / G);
      if (cols < 2 || rows < 2) return;
      // Menos traços em telas pequenas (custo de pintura no celular).
      const small = W < 720;
      const divisor = small ? 40000 : 26000;
      const count = Math.max(8, Math.min(small ? 26 : 60, Math.round((W * H) / divisor)));
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
        // Normaliza pela dimensão-base (tamanho no momento do sorteio).
        const npts = pts.map((p) => ({ x: p.x / W, y: p.y / H }));
        traces.push({ npts, pts: [], cum: [], total: 0 });
      }

      const pcount = Math.max(6, Math.min(22, Math.round(traces.length / 2.5)));
      pulses = [];
      for (let i = 0; i < pcount; i++) {
        pulses.push({ ti: rnd(traces.length), dist: 0, speed: 45 + Math.random() * 70 });
      }
    };

    // Reescala o padrão fixo para o tamanho atual (a cada resize). Como cada
    // segmento é eixo-alinhado, escalar x e y de forma independente preserva os
    // ângulos retos — só estica/encolhe o mesmo desenho.
    const layout = () => {
      for (const tr of traces) {
        tr.pts = tr.npts.map((p) => ({ x: p.x * W, y: p.y * H }));
        tr.cum = [0];
        let total = 0;
        for (let i = 1; i < tr.pts.length; i++) {
          total += Math.hypot(tr.pts[i].x - tr.pts[i - 1].x, tr.pts[i].y - tr.pts[i - 1].y);
          tr.cum.push(total);
        }
        tr.total = total;
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

    const setDims = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
    };

    const resize = () => {
      setDims();
      layout();
      rebuildStaticLayer();
    };

    // Setup inicial: dimensões → sorteia o padrão UMA vez → posiciona os pulsos.
    setDims();
    buildPattern();
    layout();
    for (const p of pulses) p.dist = Math.random() * (traces[p.ti]?.total || 100);
    rebuildStaticLayer();

    // Coalesce os eventos de resize num único relayout por frame (evita
    // recalcular a cada pixel enquanto a janela é arrastada).
    let resizeScheduled = false;
    const onResize = () => {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(() => {
        resizeScheduled = false;
        resize();
      });
    };
    window.addEventListener("resize", onResize);

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
        // Rastro seguindo o traço (polilinha), com fade do fim → cabeça.
        const pts = tailPoints(tr, p.dist - TAIL, p.dist);
        ctx.strokeStyle = c.pulse;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let k = 1; k < pts.length; k++) {
          const t = k / (pts.length - 1); // 0 no fim → 1 na cabeça
          ctx.globalAlpha = t * t;
          ctx.beginPath();
          ctx.moveTo(pts[k - 1].x, pts[k - 1].y);
          ctx.lineTo(pts[k].x, pts[k].y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        const head = pts[pts.length - 1];
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
      window.removeEventListener("resize", onResize);
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
