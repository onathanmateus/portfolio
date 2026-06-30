import { test, expect } from "@playwright/test";

test.describe("Landing", () => {
  test("mostra o nome em destaque", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Nathan Mateus" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Conhecer trajetória" })).toBeVisible();
  });
});

test.describe("Navegação entre as seções", () => {
  const routes = [
    { path: "/sobre", heading: "Um pouco sobre mim" },
    { path: "/experiencia", heading: "Experiência profissional" },
    { path: "/skills", heading: "Conhecimentos técnicos" },
    { path: "/formacao", heading: "Educação" },
    { path: "/contato", heading: "Vamos conversar" },
  ];

  for (const route of routes) {
    test(`carrega ${route.path}`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
    });
  }

  test("navega pela navbar a partir da landing", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Experiência", exact: true }).click();
    await expect(page).toHaveURL(/\/experiencia$/);
    await expect(page.getByRole("heading", { name: "Experiência profissional" })).toBeVisible();
  });
});

test.describe("Tema", () => {
  test("alterna entre claro e escuro", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const initialDark = await html.evaluate((el) => el.classList.contains("dark"));

    await page.getByRole("button", { name: /Ativar tema/ }).click();

    await expect
      .poll(async () => html.evaluate((el) => el.classList.contains("dark")))
      .toBe(!initialDark);
  });
});
