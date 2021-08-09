const config = {
  testDir: 'tests',
  // retries: 3,
  timeout: 10000,
  reporter: process.env.CI ? 'dot' : 'list',
  workers: process.env.CI ? 2 : undefined,

  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    // screenshot: 'only-on-failure',
    // trace: 'retain-on-failure',
    // video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Chromium HD',
      outputDir: '../test-results/chromium-hd/',
      use: {
        viewport: { width: 1280, height: 720 },
        browserName: 'chromium',
      },
    },
    {
      name: 'Chromium Full HD',
      outputDir: '../test-results/chromium-fhd/',
      use: {
        viewport: { width: 1920, height: 1080 },
        browserName: 'chromium',
      },
    },
    {
      name: 'Chrome HD',
      outputDir: '../test-results/chrome-hd/',
      use: {
        viewport: { width: 1280, height: 720 },
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'Chrome Full HD',
      outputDir: '../test-results/chrome-fhd/',
      use: {
        viewport: { width: 1920, height: 1080 },
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    // TODO: Test other browsers
    // FIXME: Test fails with page not loaded (white page) or missing elements
    // {
    //     name: 'Firefox',
    //     outputDir: 'output/firefox/',
    //     use: {
    //         browserName: 'firefox',
    //     }
    // },
    // {
    //     name: 'WebKit',
    //     outputDir: 'output/webkit/',
    //     use: {
    //         browserName: 'webkit',
    //     }
    // },
  ],
}

module.exports = config
