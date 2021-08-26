/* eslint-disable no-unused-vars */
const { Page, expect } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { CompletedComponents, completedSelectors } = require("./components")
const { PAGES } = require("../../utils/consts")

/**
 * Class representing the Checkout Completed's page interations
 */
class CompletedController {
    /**
     * Create the Cart controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {CartComponents} components - class with Locators of the Checkout completed page
     * @param {Object} selectors - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new CompletedComponents(this.page)
        this.selectors = completedSelectors
    }

    /**
     * Navigate to the Checkout completed page and wait until network is idle
     */
    async navigate() {
        await this.page.goto(PAGES.COMPLETED, { waitUntil: "networkidle" })
    }

    /**
     * Validate if "completedContainer" element is visible
     */
    async screenIsVisible() {
        const completedContainerElement = await this.components.completedContainer()
        await expect(completedContainerElement).toBeVisible()
    }

    /**
     * Click at the Back Home button
     */
    async navigateBackHome() {
        const backHomeButton = await this.components.completedBackButton()
        await backHomeButton.click()
    }
}

module.exports = {
    CompletedController,
    completedSelectors,
}
