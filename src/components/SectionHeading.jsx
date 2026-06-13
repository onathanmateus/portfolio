import { Reveal } from "./Reveal";
import { ScrambleText } from "./ScrambleText";

export function SectionHeading({ index, title, subtitle }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-accent">
          <span className="text-muted">[</span>
          {index}
          <span className="text-muted">]</span>
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
      </div>
      <ScrambleText
        as="h2"
        text={title}
        className="mt-4 block font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl"
      />
      {subtitle ? (
        <p className="mt-3 max-w-2xl font-mono text-sm text-muted">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
