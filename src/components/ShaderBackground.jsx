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

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),
             mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; }
  return v;
}
void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy)/u_res.y;
  float t = u_time*0.05;
  vec2 m = (u_mouse - 0.5);
  p += m*0.25;

  float n = fbm(p*2.6 + vec2(t, -t) + fbm(p*1.4 - t));
  vec2 g = abs(fract(p*9.0 + vec2(t*2.0, t)) - 0.5);
  float lines = 1.0 - smoothstep(0.0, 0.045, min(g.x, g.y));
  float energy = pow(n, 2.6);

  vec3 cyan = vec3(0.13, 0.83, 0.93);
  vec3 col = cyan * (energy*1.25 + lines*0.3*energy);

  float vig = smoothstep(1.15, 0.15, length(p));
  col *= vig;
  float alpha = (energy*0.55 + lines*0.12) * vig;
  alpha *= mix(0.18, 0.85, u_dark);

  gl_FragColor = vec4(col, alpha);
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
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uDark, dark);
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
