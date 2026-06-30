"use client";

import { useState } from "react";

// Ano atual avaliado no cliente (sempre o ano real de quem visita).
// `suppressHydrationWarning` evita aviso caso o ano do build difira do ano
// atual na virada de ano sem novo deploy.
export function CurrentYear() {
  const [year] = useState(() => new Date().getFullYear());
  return <span suppressHydrationWarning>{year}</span>;
}
