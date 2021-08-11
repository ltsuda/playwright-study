const config = {
  testDir: 'tests',
  retries: 3,
  reporter: process.env.CI ? 'dot' :  [['line'], ['experimental-allure-playwright']],
  workers: process.env.CI ? 2 : undefined,
  expect: {
    toMatchSnapshot: { threshold: 0.2 },
  },

  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    // video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium-hd',
      use: {
        viewport: { width: 1280, height: 720 },
        browserName: 'chromium',
      },
    },
    {
      name: 'chromium-fhd',
      use: {
        viewport: { width: 1920, height: 1080 },
        browserName: 'chromium',
      },
    },
    {
      name: 'chrome-hd',
      use: {
        viewport: { width: 1280, height: 720 },
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'chrome-fhd',
      use: {
        viewport: { width: 1920, height: 1080 },
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    // TODO: Test other browsers
    // FIXME: Test fails with page not loaded (white page) or missing elements
    // {
    //   name: 'firefox-hd',
    //   use: {
    //     viewport: { width: 1280, height: 720 },
    //     browserName: 'firefox',
    //   },
    // },
    // {
    //     name: 'webkit-hd',
    //     use: {
    //       viewport: { width: 1280, height: 720 },
    //         browserName: 'webkit',
    //     }
    // },
  ],
}

module.exports = config
