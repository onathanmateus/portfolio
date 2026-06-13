// Circuito procedural com pulsos de luz percorrendo as trilhas.
// Renderizado no servidor (HTML estático) — as animações são puro CSS.

const CELL = 48;

// PRNG determinístico (mulberry32) para o circuito ser estável entre builds.
function makeRng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Gera uma trilha como caminhada ortogonal (curvas em 90°), estilo PCB.
function buildTrace(rng, cols, rows) {
  let x = Math.floor(rng() * cols);
  let y = Math.floor(rng() * rows);
  const pts = [[x, y]];
  const steps = 3 + Math.floor(rng() * 6);
  let horiz = rng() > 0.5;
  for (let i = 0; i < steps; i++) {
    const len = 1 + Math.floor(rng() * 5);
    if (horiz) {
      x = clamp(x + (rng() > 0.5 ? len : -len), 0, cols);
    } else {
      y = clamp(y + (rng() > 0.5 ? len : -len), 0, rows);
    }
    if (x !== pts[pts.length - 1][0] || y !== pts[pts.length - 1][1]) {
      pts.push([x, y]);
    }
    horiz = !horiz;
  }
  const d = pts
    .map((p, i) => `${i ? "L" : "M"}${p[0] * CELL} ${p[1] * CELL}`)
    .join(" ");
  return { d, pts };
}

export function Circuit({
  variant = "hero",
  count = 16,
  seed = 7,
  cols = 30,
  rows = 15,
  className = "",
}) {
  const rng = makeRng(seed);
  const width = cols * CELL;
  const height = rows * CELL;
  const traces = [];
  const pads = [];

  for (let i = 0; i < count; i++) {
    const t = buildTrace(rng, cols, rows);
    if (t.pts.length < 2) continue;

    // Parte das trilhas recebe um pulso de luz.
    const hasPulse = variant === "hero" ? rng() > 0.35 : rng() > 0.45;
    const dur =
      variant === "hero"
        ? (3 + rng() * 3).toFixed(2)
        : (6 + rng() * 5).toFixed(2);
    const delay = (rng() * (variant === "hero" ? 5 : 14)).toFixed(2);
    const reverse = rng() > 0.5;

    traces.push({ d: t.d, hasPulse, dur, delay, reverse });

    // Pads nas pontas.
    const live = rng() > 0.6;
    [t.pts[0], t.pts[t.pts.length - 1]].forEach((p) => {
      pads.push({
        cx: p[0] * CELL,
        cy: p[1] * CELL,
        live,
        delay: (rng() * 3).toFixed(2),
      });
    });
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
    >
      {/* Trilhas base (apagadas) */}
      {traces.map((t, i) => (
        <path key={`t${i}`} className="trace" d={t.d} />
      ))}

      {/* Pads de solda */}
      {pads.map((p, i) => (
        <circle
          key={`p${i}`}
          className={`pad${p.live ? " pad-live" : ""}`}
          cx={p.cx}
          cy={p.cy}
          r="2.6"
          style={p.live ? { animationDelay: `${p.delay}s` } : undefined}
        />
      ))}

      {/* Pulsos de luz percorrendo as trilhas */}
      {traces
        .filter((t) => t.hasPulse)
        .map((t, i) => (
          <path
            key={`f${i}`}
            className={`pulse ${variant === "hero" ? "pulse-hero" : "pulse-accent"}`}
            d={t.d}
            pathLength="100"
            style={{
              animationDuration: `${t.dur}s`,
              animationDelay: `${t.delay}s`,
              animationDirection: t.reverse ? "reverse" : "normal",
            }}
          />
        ))}
    </svg>
  );
}
