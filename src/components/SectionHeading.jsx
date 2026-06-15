import { Reveal } from "./Reveal";
import { MaskText } from "./MaskText";

export function SectionHeading({ index, title, subtitle }) {
  return (
    <div className="mb-12">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">
            <span className="text-muted">[</span>
            {index}
            <span className="text-muted">]</span>
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
        </div>
      </Reveal>

      <MaskText
        as="h2"
        text={title}
        delay={0.08}
        className="mt-4 block font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl"
      />

      {subtitle ? (
        <Reveal delay={0.2}>
          <p className="mt-3 max-w-2xl font-mono text-sm text-muted">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
