import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/SectionHeading";
import { Footer } from "@/components/Footer";
import { contact, profile } from "@/data/portfolio";

describe("SectionHeading", () => {
  it("renderiza eyebrow, título e subtítulo", () => {
    render(
      <SectionHeading eyebrow="Stack" title="Conhecimentos" subtitle="Minhas ferramentas" />,
    );
    expect(screen.getByRole("heading", { name: "Conhecimentos" })).toBeInTheDocument();
    expect(screen.getByText("Stack")).toBeInTheDocument();
    expect(screen.getByText("Minhas ferramentas")).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("mostra o nome e os canais de contato", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(profile.name))).toBeInTheDocument();

    const email = screen.getByRole("link", { name: "Email" });
    expect(email).toHaveAttribute("href", `mailto:${contact.email}`);

    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      contact.linkedin,
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      contact.github,
    );
  });
});
