/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Checkout Completed's HTML selectors
 */
const completedSelectors = {
    completedContainer: "data-test='checkout-complete-container'",
    completedHeaderText: "data-test='header-complete'",
    completedText: "data-test='header-description'",
    completedImage: "data-test='img-pony-express'",
    completedBackButton: "data-test='button-back-to-products'",
}

/**
 * Class representing playwright's Locators from /checkout-completed.html page\
 * See {@link https://playwright.dev/docs/api/class-locator}
 */
class CompletedComponents {
    /**
     * Create the Checkout Completed Locator
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the checkout-completed's container Locator
     * @returns {Locator} Locator for 'completedContainer' selector
     */
    completedContainer() {
        return this.page.locator(completedSelectors.completedContainer)
    }

    /**
     * Get the header text Locator
     * @returns {Locator} Locator for 'completedHeaderText' selector
     */
    completedHeaderText() {
        return this.page.locator(completedSelectors.completedHeaderText)
    }

    /**
     * Get the completed description text Locator
     * @returns {Locator} Locator for 'completedText' selector
     */
    completedText() {
        return this.page.locator(completedSelectors.completedText)
    }

    /**
     * Get the completed image Locator
     * @returns {Locator} Locator for 'errorMessageText' selector
     */
    completedImage() {
        return this.page.locator(completedSelectors.completedImage)
    }

    /**
     * Get the back to home button Locator
     * @returns {Locator} Locator for 'completedBackButton' selector
     */
    completedBackButton() {
        return this.page.locator(completedSelectors.completedBackButton)
    }
}

module.exports = {
    CompletedComponents,
    completedSelectors,
}
