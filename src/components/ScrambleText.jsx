"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>*[]{}$_";

// Texto que "decodifica" — embaralha caracteres e revela o texto final.
// Dispara quando entra na viewport e, opcionalmente, ao passar o mouse.
export function ScrambleText({ text, className, as: Tag = "span", hover = true, duration = 700 }) {
  const [output, setOutput] = useState(text);
  const ref = useRef(null);
  const rafRef = useRef(0);
  const startedRef = useRef(false);

  function run() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOutput(text);
      return;
    }
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          out += " ";
        } else if (i < revealed) {
          out += text[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setOutput(out);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          run();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseEnter={hover ? run : undefined}
      data-cursor
    >
      {output}
    </Tag>
  );
}
