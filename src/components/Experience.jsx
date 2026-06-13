import { experiences } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Circuit } from "./Circuit";

export function Experience() {
  return (
    <section id="experiencia" className="relative scroll-mt-24 overflow-hidden">
      {/* Acento de circuito (pulsos ocasionais) */}
      <div
        className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-1/2 opacity-50"
        style={{
          maskImage: "linear-gradient(to left, #000, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to left, #000, transparent 85%)",
        }}
        aria-hidden="true"
      >
        <Circuit variant="accent" count={10} seed={11} className="h-full w-full" />
      </div>

      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        index="02"
        title="Experiência profissional"
        subtitle="Trajetória do desenvolvimento web ao Protheus, evoluindo de júnior a pleno."
      />

      <ol className="relative ml-3 border-l border-border">
        {experiences.map((exp, i) => (
          <li key={`${exp.company}-${exp.period}`} className="relative pb-12 pl-8 last:pb-0">
            {/* Marcador */}
            <span
              className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rotate-45 border-2 ${
                exp.current ? "border-accent bg-accent" : "border-accent/40 bg-background"
              }`}
              style={exp.current ? { boxShadow: "0 0 10px var(--glow)" } : undefined}
              aria-hidden="true"
            />
            <Reveal x={-20} y={0} delay={i * 0.08}>
              <div className="cyber-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold uppercase tracking-tight">{exp.role}</h3>
                  <span className="rounded-sm border border-border px-3 py-1 font-mono text-xs text-accent">
                    {exp.period}
                  </span>
                </div>
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-accent hover:underline"
                >
                  {exp.company}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-muted">{exp.summary}</p>
                <ul className="mt-4 space-y-2">
                  {exp.highlights.map((h, hi) => (
                    <li key={hi} className="flex gap-2 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      </div>
    </section>
  );
}
