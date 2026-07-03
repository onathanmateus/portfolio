"use client";

import Link from "next/link";
import { Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useContent, useUi } from "./LanguageProvider";

export function Education() {
  const { education } = useContent();
  const t = useUi();

  return (
    <section id="formacao" className="mx-auto my-auto w-full max-w-5xl">
      <SectionHeading eyebrow={t.education.eyebrow} title={t.education.title} />

      <Stagger className="flex flex-col gap-3">
        {education.map((item) => (
          <RevealItem key={item.course}>
            <div className="liquid-glass lift grid gap-2 rounded-2xl border p-5 md:grid-cols-[240px_1fr] md:items-baseline">
              <span className="mono text-sm text-muted">{item.period}</span>
              <div>
                <h3 className="text-xl font-medium text-foreground sm:text-2xl">
                  {item.course}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {item.school}
                  </Link>
                  <span className="mono text-sm">· {item.location}</span>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
