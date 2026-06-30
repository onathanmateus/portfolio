import {
  profile,
  contact,
  experiences,
  skillGroups,
  education,
} from "@/data/portfolio";

describe("dados do portfólio", () => {
  it("expõe o perfil básico", () => {
    expect(profile.name).toBe("Nathan Mateus");
    expect(profile.role).toMatch(/Analista de Sistemas/i);
    expect(profile.about.length).toBeGreaterThan(0);
  });

  it("tem contatos válidos", () => {
    expect(contact.email).toContain("@");
    expect(contact.linkedin).toMatch(/^https:\/\/.*linkedin/i);
    expect(contact.github).toMatch(/^https:\/\/github\.com/i);
  });

  it("lista experiências com exatamente uma marcada como atual", () => {
    expect(experiences.length).toBeGreaterThanOrEqual(1);
    const current = experiences.filter((e) => e.current);
    expect(current).toHaveLength(1);
    experiences.forEach((e) => {
      expect(e.company).toBeTruthy();
      expect(e.highlights.length).toBeGreaterThan(0);
    });
  });

  it("agrupa skills sem grupos vazios", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    skillGroups.forEach((group) => {
      expect(group.title).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    });
  });

  it("lista a formação acadêmica", () => {
    expect(education.length).toBeGreaterThan(0);
    education.forEach((item) => {
      expect(item.course).toBeTruthy();
      expect(item.school).toBeTruthy();
    });
  });
});
