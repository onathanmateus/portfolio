"use client";

import Link from "next/link";
import { Card, Chip } from "@heroui/react";
import { Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useContent, useUi } from "./LanguageProvider";

export function Experience() {
  const { experiences } = useContent();
  const t = useUi();

  return (
    <section id="experiencia" className="mx-auto my-auto w-full max-w-5xl">
      <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} />

      <Stagger className="flex flex-col gap-3">
        {experiences.map((exp, i) => (
          <RevealItem key={`${exp.company}-${i}`}>
            <Card className="liquid-glass lift p-3.5">
              <Card.Header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Card.Title className="text-xl">{exp.role}</Card.Title>
                    {exp.current ? (
                      <Chip color="accent" variant="soft" size="sm">
                        {t.experience.current}
                      </Chip>
                    ) : null}
                  </div>
                  <Card.Description>
                    <Link
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {exp.company}
                    </Link>
                  </Card.Description>
                </div>
                <span className="shrink-0 text-sm text-muted">{exp.period}</span>
              </Card.Header>

              <Card.Content className="space-y-3">
                <p className="leading-relaxed text-muted">{exp.summary}</p>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-sm text-muted">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Card.Content>
            </Card>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
