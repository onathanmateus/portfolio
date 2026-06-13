import { experiences } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experiencia" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28">
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
              className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                exp.current ? "border-accent bg-accent" : "border-border bg-background"
              }`}
              aria-hidden="true"
            />
            <Reveal x={-20} y={0} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
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
    </section>
  );
}
