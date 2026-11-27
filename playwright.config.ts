import { defineConfig, devices } from '@playwright/test';
/* Two runs against a production build:
   - E2E_MODE=production : nothing configured — public pages work, nothing pretends to submit.
   - E2E_MODE=preview    : preview test-data mode — full journey with test data.
   Start the server yourself (see README "End-to-end tests"), then: npm run e2e */
const exe = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  use: { baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000', ...(exe ? { launchOptions: { executablePath: exe } } : {}) },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ]
});
