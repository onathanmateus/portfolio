import { Chip } from "@heroui/react";
import { projects } from "@/data/portfolio";
import { Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projetos" className="mx-auto my-auto w-full max-w-5xl">
      <SectionHeading
        eyebrow="// projetos"
        title="Projetos"
        subtitle="Projetos que criei — disponíveis no ar para explorar."
      />

      <Stagger className="flex flex-col gap-3">
        {projects.map((project, i) => (
          <RevealItem key={project.name}>
            <article className="liquid-glass lift grid gap-4 rounded-2xl border p-6 md:grid-cols-[240px_1fr]">
              <div className="mono text-sm text-muted">
                <span className="text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {project.url ? (
                  <span className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    online
                  </span>
                ) : null}
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground sm:text-2xl">
                  {project.name}
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Chip key={tag} variant="secondary" size="sm">
                      {tag}
                    </Chip>
                  ))}
                </div>

                <div className="mono mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-accent transition-colors hover:text-foreground"
                    >
                      Acessar
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </a>
                  ) : null}
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
                    >
                      GitHub
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
