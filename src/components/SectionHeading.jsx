import { Reveal } from "./Reveal";

export function SectionHeading({ index, title, subtitle }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-accent">{index}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-muted">{subtitle}</p> : null}
    </Reveal>
  );
}
