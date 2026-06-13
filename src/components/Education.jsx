import { education } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Tilt } from "./Tilt";

export function Education() {
  return (
    <section id="formacao" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28">
      <SectionHeading index="04" title="Formação acadêmica" />

      <div className="grid gap-5 sm:grid-cols-2">
        {education.map((edu, i) => (
          <Reveal key={edu.course} delay={i * 0.08}>
            <Tilt className="h-full" max={6}>
              <div className="cyber-card h-full p-6">
                <span className="font-mono text-xs text-accent">{edu.period}</span>
                <h3 className="mt-2 font-display text-base font-bold uppercase tracking-tight">{edu.course}</h3>
                <a
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-accent hover:underline"
                >
                  {edu.school}
                </a>
                <p className="mt-2 text-sm text-muted">{edu.location}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
