import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:3000";

export default defineConfig({
  testDir: "./tests-e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Roda contra o build de produção: hidratação rápida e estável (sem a
  // compilação sob demanda do dev, que causa corrida no clique sob carga).
  webServer: {
    command: "npm run build && npm run start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
  },
});
