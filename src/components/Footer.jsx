import { profile } from "@/data/portfolio";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-5 py-8 text-center text-sm text-muted sm:px-6">
        © <CurrentYear /> {profile.name}
      </div>
    </footer>
  );
}
