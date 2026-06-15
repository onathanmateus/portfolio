"use client";

import { PageShutter } from "@/components/PageShutter";

// Re-monta a cada navegação → toca a transição shutter e revela a página.
export default function Template({ children }) {
  return (
    <>
      <PageShutter />
      {children}
    </>
  );
}
