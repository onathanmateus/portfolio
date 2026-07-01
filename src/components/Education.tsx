import Link from "next/link";
import { Card } from "@heroui/react";
import { education } from "@/data/portfolio";
import { Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="formacao" className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
      <SectionHeading eyebrow="// formacao" title="Educação" />

      <Stagger className="grid flex-1 gap-5 sm:grid-cols-2">
        {education.map((item) => (
          <RevealItem key={item.course} className="h-full">
            <Card className="lift flex h-full flex-col justify-center">
              <Card.Header>
                <Card.Title className="text-lg">{item.course}</Card.Title>
                <Card.Description>
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {item.school}
                  </Link>
                </Card.Description>
              </Card.Header>
              <Card.Footer className="mono justify-between text-sm text-muted">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </Card.Footer>
            </Card>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
