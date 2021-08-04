const config = {

    testDir: 'test',
    retries: 3,
    timeout: 10000,
    reporter: process.env.CI ? 'dot' : 'list',
    workers: process.env.CI ? 2 : undefined,

    use: {
        headless: true,
        viewport: { width: 1366, height: 768 },
        baseURL: 'https://www.saucedemo.com',
        screenshot: 'only-on-failure',
        // trace: 'retain-on-failure',
        // video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'Chromium',
            outputDir: 'output/chromium/',
            use: {
                browserName = 'chromium',
            }
        },
        {
            name: 'Firefox',
            outputDir: 'output/firefox/',
            use: {
                browserName = 'firefox',
            }
        },
        {
            name: 'WebKit',
            outputDir: 'output/webkit/',
            use: {
                browserName = 'webkit',
            }
        },
    ]
}

module.exports = config