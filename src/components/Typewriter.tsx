"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

interface TypewriterProps {
  text: string;
  as?: ElementType;
  className?: string;
  // "mount": digita ao carregar. "hover": mostra completo e redigita ao passar o mouse.
  trigger?: "mount" | "hover";
  speed?: number; // ms por caractere
  startDelay?: number; // ms antes de começar (mount)
}

export function Typewriter({
  text,
  as: Tag = "span",
  className,
  trigger = "mount",
  speed = 55,
  startDelay = 0,
}: TypewriterProps) {
  // Inicia com o texto completo → SSR/no-JS e hidratação corretos.
  const [display, setDisplay] = useState(text);
  const [typing, setTyping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const type = (delay = 0) => {
    if (timer.current) clearTimeout(timer.current);
    setTyping(true);
    setDisplay("");
    let i = 0;
    const tick = () => {
      i++;
      setDisplay(text.slice(0, i));
      if (i < text.length) {
        timer.current = setTimeout(tick, speed);
      } else {
        setTyping(false);
      }
    };
    timer.current = setTimeout(tick, delay + speed);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || trigger !== "mount") return;
    // Agenda fora do ciclo síncrono do effect (evita cascata de renders).
    const kickoff = setTimeout(() => type(startDelay), 0);
    return () => {
      clearTimeout(kickoff);
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEnter = () => {
    if (trigger === "hover" && !typing) type(0);
  };

  return (
    <Tag className={className} onMouseEnter={onEnter}>
      {display}
      {typing ? <span className="tw-caret" aria-hidden="true" /> : null}
    </Tag>
  );
}
