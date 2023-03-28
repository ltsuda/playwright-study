const { devices } = require("@playwright/test")

const config = {
    testDir: "tests",
    retries: 1,
    fullyParallel: true,
    reporter: process.env.CI ? [["dot"], ["html", { open: "never" }]] : [["line"], ["html", { open: "never" }]],
    workers: process.env.CI ? '20%' : undefined,
    expect: {
        toMatchSnapshot: { threshold: 0.2 },
    },

    use: {
        headless: true,
        baseURL: "http://web:3000",
        screenshot: {
            mode: "only-on-failure",
            fullPage: true
        },
        trace: "on-first-retry",
        video: "on-first-retry",
    },

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
}

module.exports = config
