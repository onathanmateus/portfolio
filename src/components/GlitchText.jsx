// Texto com efeito glitch cyberpunk (dispara em janelas curtas, "de vez em quando").
// O texto precisa ser string para alimentar os pseudo-elementos via data-text.
export function GlitchText({ children, className = "" }) {
  return (
    <span className={`glitch ${className}`} data-text={children}>
      {children}
    </span>
  );
}
