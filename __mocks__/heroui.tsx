/* eslint-disable react/display-name -- mock simples de teste */
import type { ReactNode } from "react";

// Mock leve do @heroui/react (ESM) para os testes unitários (Jest/CJS).
// Renderiza os componentes como elementos simples, preservando children/props.

type Props = { children?: ReactNode; className?: string } & Record<string, unknown>;

export function Chip({ children, className }: Props) {
  return <span className={className}>{children}</span>;
}

function CardRoot({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
CardRoot.Header = ({ children, className }: Props) => <div className={className}>{children}</div>;
CardRoot.Title = ({ children, className }: Props) => <h3 className={className}>{children}</h3>;
CardRoot.Description = ({ children, className }: Props) => <p className={className}>{children}</p>;
CardRoot.Content = ({ children, className }: Props) => <div className={className}>{children}</div>;
CardRoot.Footer = ({ children, className }: Props) => <div className={className}>{children}</div>;

export const Card = CardRoot;

export function Button({ children, className }: Props) {
  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}
