import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Caminho do app Next para carregar next.config e o .env de teste
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@heroui/react$": "<rootDir>/__mocks__/heroui.tsx",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests-e2e/"],
};

export default createJestConfig(config);
