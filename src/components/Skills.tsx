import { Card, Chip } from "@heroui/react";
import { skillGroups } from "@/data/portfolio";
import { Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-5xl scroll-mt-24">
      <SectionHeading
        eyebrow="Stack"
        title="Conhecimentos técnicos"
        subtitle="Ferramentas e tecnologias com que trabalho no dia a dia."
      />

      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <RevealItem key={group.title}>
            <Card className="lift h-full">
              <Card.Header>
                <Card.Title className="text-lg">{group.title}</Card.Title>
              </Card.Header>
              <Card.Content className="flex flex-row flex-wrap items-center gap-2">
                {group.items.map((item) => (
                  <Chip key={item} variant="secondary" size="sm">
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
