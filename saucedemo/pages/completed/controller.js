/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { CompletedComponents, completedLocators } = require("./components")
const { PAGES } = require("../../utils/consts")

/**
 * Class representing the Checkout Completed's page interations
 */
class CompletedController {
    /**
     * Create the Cart controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {CartComponents} components - class with elementsHandle of the Checkout completed page
     * @param {Object} locators - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new CompletedComponents(this.page)
        this.locators = completedLocators
    }

    /**
     * Navigate to the Checkout completed page and wait until network is idle
     */
    async navigate() {
        await this.page.goto(PAGES.COMPLETED, "networkidle")
    }

    /**
     * Validate if "completedContainer" element is visible
     */
    async screenIsVisible() {
        const completedContainerElement = await this.components.completedContainer()
        await completedContainerElement.isVisible()
    }

    /**
     * Click at the "Back Home" button
     */
    async navigateBackHome() {
        const backHomeButton = await this.components.completedBackButton()
        await backHomeButton.click()
    }

    /**
     * Get header thank you message inside completedContainer
     * @returns header element text
     */
    async getHeaderText() {
        const headerElement = await this.components.completedHeaderText()
        return await headerElement.innerText()
    }

    /**
     * Get order dispatched message inside completedContainer
     * @returns completed element text
     */
    async getCompletedText() {
        const completedElement = await this.components.completedText()
        return await completedElement.innerText()
    }

    /**
     * Get completed image source inside completedContainer
     * @returns image's source URL
     */
    async getCompletedImage() {
        const imageElement = await this.components.completedImage()
        return await imageElement.getAttribute("src")
    }
}

module.exports = {
    CompletedController,
    completedLocators,
}
