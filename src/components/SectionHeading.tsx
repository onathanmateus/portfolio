import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      {eyebrow ? (
        <Reveal>
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent">
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </Reveal>

      {subtitle ? (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
