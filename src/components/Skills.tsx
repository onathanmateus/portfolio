import { Chip } from "@heroui/react";
import { skillGroups } from "@/data/portfolio";
import { Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
      <SectionHeading
        eyebrow="// stack"
        title="Conhecimentos técnicos"
        subtitle="Ferramentas e tecnologias com que trabalho no dia a dia."
      />

      <Stagger className="flex flex-1 flex-col justify-center divide-y divide-border">
        {skillGroups.map((group) => (
          <RevealItem key={group.title}>
            <div className="grid items-center gap-4 py-7 md:grid-cols-[220px_1fr]">
              <h3 className="mono text-sm text-accent">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip key={item} variant="secondary" size="lg">
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
