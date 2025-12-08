import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "src/tests/playwright",
  timeout: 10000,

  use: {
    baseURL: "http://localhost:3001",
  },
  webServer: {
    command: "npm run start",
    port: 3001,
    reuseExistingServer: true,
  },

  workers: 1,
};

export default config;
