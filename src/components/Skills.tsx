"use client";

import { Chip } from "@heroui/react";
import { Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useContent, useUi } from "./LanguageProvider";

export function Skills() {
  const { skillGroups } = useContent();
  const t = useUi();

  return (
    <section id="skills" className="mx-auto my-auto w-full max-w-5xl">
      <SectionHeading
        eyebrow={t.skills.eyebrow}
        title={t.skills.title}
        subtitle={t.skills.subtitle}
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
