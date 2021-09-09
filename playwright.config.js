const { devices } = require("@playwright/test")

const config = {
    testDir: "tests",
    retries: 1,
    reporter: process.env.CI ? [["dot"], ["allure-playwright"]] : [["line"], ["allure-playwright"]],
    workers: process.env.CI ? 2 : undefined,
    expect: {
        toMatchSnapshot: { threshold: 0.2 },
    },

    use: {
        headless: true,
        baseURL: "https://www.saucedemo.com",
        screenshot: "only-on-failure",
        trace: "on-first-retry",
        video: "on-first-retry",
    },

    projects: [
        {
            name: "chromium-hd",
            outputDir: "../test-results/chromium-hd/",
            use: {
                viewport: { width: 1280, height: 720 },
                browserName: "chromium",
            },
        },
        {
            name: "chromium-fhd",
            outputDir: "../test-results/chromium-fhd/",
            use: {
                viewport: { width: 1920, height: 1080 },
                browserName: "chromium",
            },
        },
        {
            name: "chrome-hd",
            outputDir: "../test-results/chrome-hd/",
            use: {
                viewport: { width: 1280, height: 720 },
                browserName: "chromium",
                channel: "chrome",
            },
        },
        {
            name: "firefox-hd",
            outputDir: "../test-results/firefox-hd/",
            use: {
                viewport: { width: 1280, height: 720 },
                browserName: "firefox",
            },
        },
        {
            name: "webkit-hd",
            outputDir: "../test-results/webkit-hd/",
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
}

module.exports = config
