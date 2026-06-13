import { skillGroups } from "@/data/portfolio";
import { Reveal, Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        index="03"
        title="Conhecimentos técnicos"
        subtitle="Ferramentas e tecnologias que utilizo no dia a dia."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08}>
            <div className="cyber-card h-full p-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent neon-text">
                {group.title}
              </h3>
              <Stagger className="mt-4 flex flex-wrap gap-2" gap={0.05} delay={0.1}>
                {group.items.map((item) => (
                  <RevealItem
                    key={item}
                    className="rounded-sm border border-border bg-surface-2 px-3 py-1.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {item}
                  </RevealItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
