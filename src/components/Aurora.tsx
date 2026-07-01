// Fundo vivo: manchas de gradiente que derivam lentamente (só CSS).
// prefers-reduced-motion zera as animações (regra global no globals.css).
export function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="aurora-blob aurora-a left-[-10%] top-[-10%] h-[45vw] w-[45vw]" />
      <div className="aurora-blob aurora-b right-[-15%] top-[20%] h-[40vw] w-[40vw]" />
      <div className="aurora-blob aurora-c bottom-[-15%] left-[20%] h-[38vw] w-[38vw]" />
    </div>
  );
}
