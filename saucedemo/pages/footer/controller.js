/* eslint-disable no-unused-vars */
const { Page, expect } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { FooterComponents, footerSelectors } = require("./components")

/**
 * Class representing the Footer's elements interations
 */
class FooterController {
    /**
     * Create the Footer controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {CartComponents} components - class with Locators of the footer elements
     * @param {Object} locators - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new FooterComponents(this.page)
        this.selectors = footerSelectors
    }

    /**
     * Validate if "footerContainer" element is visible
     */
    async componentIsVisible() {
        const footerContainerElement = await this.components.footerContainer()
        await expect(footerContainerElement).toBeVisible()
    }
}

module.exports = { FooterController }
