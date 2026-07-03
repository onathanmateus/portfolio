import { Chip } from "@heroui/react";
import { skillGroups } from "@/data/portfolio";
import { Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="mx-auto my-auto w-full max-w-5xl">
      <SectionHeading
        eyebrow="// stack"
        title="Conhecimentos técnicos"
        subtitle="Ferramentas e tecnologias com que trabalho no dia a dia."
      />

      <Stagger className="flex flex-col gap-3">
        {skillGroups.map((group) => (
          <RevealItem key={group.title}>
            <div className="liquid-glass lift grid gap-3 rounded-2xl border p-5 md:grid-cols-[240px_1fr] md:items-center">
              <span className="mono text-sm text-muted">{`// ${group.title}`}</span>
              <div className="flex flex-wrap gap-2.5">
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
