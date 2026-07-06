import { Reveal } from "./Reveal";
import { Typewriter } from "./Typewriter";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      {eyebrow ? (
        <Reveal>
          <p className="mono mb-3 text-sm font-medium tracking-wide text-accent">
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <Typewriter
          as="h2"
          trigger="hover"
          text={title}
          className="inline-block cursor-default text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        />
      </Reveal>

      {subtitle ? (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
