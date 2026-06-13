import { profile } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="sobre" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28">
      <SectionHeading index="01" title="Sobre mim" />
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <Reveal className="space-y-5">
          {profile.about.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-surface p-6 glow-accent">
            <dl className="space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Cargo atual</dt>
                <dd className="mt-1 font-medium">{profile.role}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Localização</dt>
                <dd className="mt-1 font-medium">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Foco</dt>
                <dd className="mt-1 font-medium">Protheus · ADVPL / TLPP · Web</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
