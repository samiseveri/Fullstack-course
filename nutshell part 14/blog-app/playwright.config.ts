import { defineConfig, devices } from "@playwright/test"
import dotenv from "dotenv"

if (process.env.CI) {
  dotenv.config({ path: ".env.test" })
} else {
  dotenv.config({ path: ".env.local" })
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      ...process.env,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    },
  },
})
