import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Mobile 390x844',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Mobile 430x932',
      use: { ...devices['iPhone 14 Pro Max'] },
    },
    {
      name: 'Tablet 768x1024',
      use: { ...devices['iPad Mini'] },
    },
    {
      name: 'Laptop 1280x800',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop 1440x900',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});
