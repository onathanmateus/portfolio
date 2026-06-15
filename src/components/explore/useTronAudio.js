"use client";

import { useCallback, useRef, useState } from "react";

// Áudio sintetizado (sem arquivos): drone ambiente + motor (varia com a
// velocidade) + zap de morte. Ligado/desligado por um botão.
export function useTronAudio() {
  const ctxRef = useRef(null);
  const nodes = useRef(null);
  const [enabled, setEnabled] = useState(false);

  const ensure = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const droneA = ctx.createOscillator();
    droneA.type = "sawtooth";
    droneA.frequency.value = 41;
    const droneB = ctx.createOscillator();
    droneB.type = "sine";
    droneB.frequency.value = 82;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 260;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.5;
    droneA.connect(lp);
    droneB.connect(lp);
    lp.connect(droneGain);
    droneGain.connect(master);
    droneA.start();
    droneB.start();

    const eng = ctx.createOscillator();
    eng.type = "square";
    eng.frequency.value = 64;
    const engFilter = ctx.createBiquadFilter();
    engFilter.type = "lowpass";
    engFilter.frequency.value = 900;
    const engGain = ctx.createGain();
    engGain.gain.value = 0;
    eng.connect(engFilter);
    engFilter.connect(engGain);
    engGain.connect(master);
    eng.start();

    nodes.current = { ctx, master, eng, engGain };
    ctxRef.current = ctx;
    return ctx;
  }, []);

  const toggle = useCallback(() => {
    const ctx = ensure();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    setEnabled((on) => {
      const next = !on;
      if (nodes.current) nodes.current.master.gain.setTargetAtTime(next ? 0.55 : 0, ctx.currentTime, 0.12);
      return next;
    });
  }, [ensure]);

  const setSpeed = useCallback((speed) => {
    if (!nodes.current) return;
    const { ctx, eng, engGain } = nodes.current;
    const sp = Math.abs(speed);
    eng.frequency.setTargetAtTime(58 + sp * 7, ctx.currentTime, 0.06);
    engGain.gain.setTargetAtTime(Math.min(0.16, sp * 0.012), ctx.currentTime, 0.08);
  }, []);

  const playDeath = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !nodes.current) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(620, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.5);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.45, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    o.connect(g);
    g.connect(nodes.current.master);
    o.start(t);
    o.stop(t + 0.6);
  }, []);

  return { enabled, toggle, setSpeed, playDeath };
}
