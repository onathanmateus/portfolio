import { Card } from "@heroui/react";
import { profile } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="sobre" className="mx-auto my-auto w-full max-w-5xl">
      <SectionHeading eyebrow="// sobre" title="Um pouco sobre mim" />

      <div className="grid items-center gap-8 md:grid-cols-[1.6fr_1fr]">
        <Reveal className="space-y-5">
          {profile.about.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="lift h-full">
            <Card.Content className="flex h-full flex-col justify-center gap-5">
              <Detail label="Cargo atual" value={profile.role} />
              <Detail label="Localização" value={profile.location} />
              <Detail label="Foco" value="Protheus · ADVPL / TLPP · Web" />
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
