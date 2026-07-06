"use client";

import { Card } from "@heroui/react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useContent, useUi } from "./LanguageProvider";

export function About() {
  const { profile } = useContent();
  const t = useUi();

  return (
    <section id="sobre" className="mx-auto my-auto w-full max-w-5xl">
      <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />

      <div className="grid items-center gap-8 md:grid-cols-[1.6fr_1fr]">
        <Reveal className="space-y-5">
          {profile.about.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="liquid-glass lift h-full">
            <Card.Content className="flex h-full flex-col justify-center gap-5">
              <Detail label={t.about.role} value={profile.role} />
              <Detail label={t.about.location} value={profile.location} />
              <Detail label={t.about.focus} value={t.about.focusValue} />
            </Card.Content>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mono text-xs tracking-wide text-accent uppercase">{label}</dt>
      <dd className="mt-1 font-medium text-foreground">{value}</dd>
    </div>
  );
}
