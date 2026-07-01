"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

// Fundo animado por shader WebGL: campo fluido de cores da marca que se move
// devagar, com um "feixe" de luz que cruza a tela de tempos em tempos.
// Leve (1 triângulo fullscreen, sem geometria) → roda bem no celular e no
// desktop. Pausa com prefers-reduced-motion e quando a aba fica oculta.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2  u_res;
uniform vec3  u_base;
uniform vec3  u_c1;
uniform vec3  u_c2;
uniform vec3  u_c3;
uniform float u_intensity;

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.05;

  // Manchas de cor que orbitam devagar
  vec2 b1 = vec2(0.30 + 0.22 * sin(t * 0.70),        0.35 + 0.20 * cos(t * 0.50));
  vec2 b2 = vec2(0.75 + 0.20 * cos(t * 0.43),        0.60 + 0.22 * sin(t * 0.61));
  vec2 b3 = vec2(0.50 + 0.26 * sin(t * 0.34 + 2.0),  0.55 + 0.24 * cos(t * 0.47 + 1.0));
  float asp = u_res.x / u_res.y;
  b1.x *= asp; b2.x *= asp; b3.x *= asp;

  float d1 = smoothstep(0.75, 0.0, length(p - b1));
  float d2 = smoothstep(0.80, 0.0, length(p - b2));
  float d3 = smoothstep(0.70, 0.0, length(p - b3));

  // Ondulação sutil sobreposta
  float wave = sin(p.x * 3.0 + t * 1.3) + sin(p.y * 3.5 - t * 1.1 + sin(p.x * 2.0 + t));
  wave *= 0.5;

  vec3 col = u_base;
  col = mix(col, u_c1, d1 * 0.60 * u_intensity);
  col = mix(col, u_c2, d2 * 0.55 * u_intensity);
  col = mix(col, u_c3, d3 * 0.50 * u_intensity);
  col += 0.02 * wave * u_intensity;

  // Feixe diagonal que cruza a tela periodicamente
  float sweepX = fract(t * 0.06) * (asp + 1.4) - 0.7;
  float band = abs((p.x - sweepX) - p.y * 0.35);
  float streak = smoothstep(0.12, 0.0, band);
  col += streak * u_c2 * 0.14 * u_intensity;

  gl_FragColor = vec4(col, 1.0);
}
`;

type Palette = { base: [number, number, number]; c1: [number, number, number]; c2: [number, number, number]; c3: [number, number, number]; intensity: number };

const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    base: [0.157, 0.165, 0.212], // #282a36
    c1: [0.741, 0.576, 0.976], // roxo Dracula
    c2: [0.545, 0.914, 0.992], // ciano
    c3: [1.0, 0.475, 0.776], // rosa
    intensity: 1.0,
  },
  light: {
    base: [0.961, 0.961, 0.969], // #f5f5f7
    c1: [0.0, 0.443, 0.891], // azul Apple
    c2: [0.13, 0.827, 0.933], // ciano
    c3: [0.61, 0.55, 1.0], // violeta
    intensity: 0.45,
  },
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const paletteRef = useRef<Palette>(PALETTES.dark);

  useEffect(() => {
    paletteRef.current = PALETTES[theme === "light" ? "light" : "dark"];
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return; // sem WebGL: o fundo do html (CSS) já cobre

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uBase = gl.getUniformLocation(prog, "u_base");
    const uC1 = gl.getUniformLocation(prog, "u_c1");
    const uC2 = gl.getUniformLocation(prog, "u_c2");
    const uC3 = gl.getUniformLocation(prog, "u_c3");
    const uInt = gl.getUniformLocation(prog, "u_intensity");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let running = true;
    const start = performance.now();

    const draw = (now: number) => {
      const p = paletteRef.current;
      gl.uniform1f(uTime, reduce ? 6 : (now - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform3fv(uBase, p.base);
      gl.uniform3fv(uC1, p.c1);
      gl.uniform3fv(uC2, p.c2);
      gl.uniform3fv(uC3, p.c3);
      gl.uniform1f(uInt, p.intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce && running) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
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
