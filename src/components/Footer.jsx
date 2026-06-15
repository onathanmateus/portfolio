import { profile } from "@/data/portfolio";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="glass border-t border-border backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto max-w-5xl px-5 py-8 text-center font-mono text-xs uppercase tracking-widest text-muted sm:px-6">
        <span className="text-accent">&gt;</span> © <CurrentYear /> {profile.name}
        <span className="ml-1 inline-block animate-pulse text-accent">_</span>
      </div>
    </footer>
  );
}
