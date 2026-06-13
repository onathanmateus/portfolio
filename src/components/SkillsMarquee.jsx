import { skillGroups } from "@/data/portfolio";

const all = skillGroups.flatMap((g) => g.items);

// Ticker infinito de tecnologias (full-bleed).
export function SkillsMarquee() {
  const row = [...all, ...all];
  return (
    <div
      className="relative flex overflow-hidden border-y border-border py-4"
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
      aria-hidden="true"
    >
      <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-semibold uppercase tracking-wider text-muted">
            <span className="text-accent">◇</span>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
