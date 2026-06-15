"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_dark;
uniform float u_scroll;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),
             mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i=0;i<6;i++){ v+=a*noise(p); p=m*p; a*=0.5; }
  return v;
}
void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy)/u_res.y;
  float t = u_time*0.08;
  vec2 m = (u_mouse - 0.5);

  // Domain warp + o scroll deforma e desloca o campo.
  vec2 q = p*1.8 + vec2(0.0, u_scroll*1.2) + m*0.4;
  float warp = fbm(q + t);
  float n = fbm(q + warp*1.6 + vec2(-t, t*0.6));

  // Streaks de energia que correm com o scroll.
  float streak = pow(abs(sin(p.y*6.0 + warp*3.0 - u_scroll*2.0 + t*2.0)), 18.0);
  // Grade em movimento.
  vec2 g = abs(fract(p*7.0 + vec2(t, -t + u_scroll)) - 0.5);
  float lines = 1.0 - smoothstep(0.0, 0.04, min(g.x, g.y));
  // Ondulação ao redor do cursor.
  float ripple = 0.12 / (length(p - m)*8.0 + 0.4);

  float energy = pow(n, 2.2);
  vec3 cyan = vec3(0.18, 0.85, 0.95);
  vec3 col = cyan * (energy*1.4 + streak*0.7 + lines*0.25 + ripple);

  float vig = smoothstep(1.3, 0.05, length(p));
  col *= vig;
  float alpha = (energy*0.6 + streak*0.5 + lines*0.12 + ripple*0.6) * vig;
  alpha *= mix(0.22, 0.95, u_dark);

  gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.95));
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function ShaderBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
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

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uDark = gl.getUniformLocation(prog, "u_dark");
    const uScroll = gl.getUniformLocation(prog, "u_scroll");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const mouse = { x: 0.5, y: 0.5 };
    const scale = 0.7; // sub-resolução para performance

    function resize() {
      const w = Math.floor(canvas.clientWidth * scale);
      const h = Math.floor(canvas.clientHeight * scale);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    function onMove(e) {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1 - e.clientY / window.innerHeight;
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();
    const render = (now) => {
      resize();
      const dark = document.documentElement.classList.contains("dark") ? 1 : 0;
      const scroll = window.scrollY / Math.max(1, window.innerHeight);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uDark, dark);
      gl.uniform1f(uScroll, scroll);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
