import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? '20%' : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [["dot"], ["html", { open: "never" }]] : [["line"], ["html", { open: "never" }]],

  expect: {
    toMatchSnapshot: { threshold: 0.2 },
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    testIdAttribute: "data-test",

    /* Base URL to use in actions like `await page.goto('/')`. */
    headless: true,
    baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: {
      mode: "only-on-failure",
      fullPage: true
    },
    video: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium-hd",
      use: {
        viewport: { width: 1280, height: 720 },
        browserName: "chromium",
      },
    },
    {
      name: "chromium-fhd",
      use: {
        viewport: { width: 1920, height: 1080 },
        browserName: "chromium",
      },
    },
    {
      name: "firefox-hd",
      use: {
        viewport: { width: 1280, height: 720 },
        browserName: "firefox",
      },
    },
    {
      name: "webkit-hd",
      use: {
        viewport: { width: 1280, height: 720 },
        browserName: "webkit",
      },
    },
    {
      name: "iphone-8",
      use: {
        browserName: "webkit",
        ...devices["iPhone 8"],
      },
    },
    {
      name: "pixel-4",
      use: {
        browserName: "chromium",
        ...devices["Pixel 4"],
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "serve -c ./serve.json -s ./sample-app-web",
    port: 3000,
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
