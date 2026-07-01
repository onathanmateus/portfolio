import Link from "next/link";
import { contact, profile } from "@/data/portfolio";
import { CurrentYear } from "./CurrentYear";

const social = [
  { label: "email", href: `mailto:${contact.email}` },
  { label: "linkedin", href: contact.linkedin },
  { label: "github", href: contact.github },
];

export function Footer() {
  return (
    <footer className="shrink-0 px-4 sm:px-6">
      <div className="mx-auto mb-3 flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-border/70 bg-surface/40 px-4 py-2.5 text-xs text-muted backdrop-blur-xl backdrop-saturate-150 sm:px-5">
        <p className="mono">
          © <CurrentYear /> {profile.name}
        </p>
        <nav className="mono flex items-center gap-4">
          {social.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
