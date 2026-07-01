import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Cada página das seções ocupa exatamente uma tela: navbar fixa no topo,
// conteúdo no meio e rodapé sempre visível — sem rolar a página até o rodapé
// no desktop. Se o conteúdo exceder a altura, apenas a área do meio rola.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-[100svh] flex-col overflow-hidden">
      <Navbar />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
