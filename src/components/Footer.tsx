import Link from "next/link";
import { contact, profile } from "@/data/portfolio";
import { CurrentYear } from "./CurrentYear";

const social = [
  { label: "Email", href: `mailto:${contact.email}` },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "GitHub", href: contact.github },
];

export function Footer() {
  return (
    <footer className="glass mt-auto border-t border-border backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          © <CurrentYear /> {profile.name}
        </p>
        <nav className="flex items-center gap-5">
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
