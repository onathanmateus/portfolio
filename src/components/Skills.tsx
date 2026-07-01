import { Card, Chip } from "@heroui/react";
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

      <Stagger className="grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <RevealItem key={group.title} className="h-full">
            <Card className="lift flex h-full flex-col">
              <Card.Header>
                <Card.Title className="mono text-lg">{group.title}</Card.Title>
              </Card.Header>
              <Card.Content className="flex flex-1 flex-row flex-wrap content-center items-center gap-2">
                {group.items.map((item) => (
                  <Chip key={item} variant="secondary">
                    {item}
                  </Chip>
                ))}
              </Card.Content>
            </Card>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
