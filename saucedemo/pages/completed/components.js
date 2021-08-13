/* eslint-disable no-unused-vars */
const { Page, ElementHandle } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Checkout Completed's HTML selectors
 */
const completedLocators = {
    completedContainer: "[class='checkout_complete_container']",
    completedHeaderText: "[class='complete-header']",
    completedText: "[class='complete-text']",
    completedImage: "[class='pony_express']",
    completedBackButton: "[data-test='back-to-products']",
}

/**
 * Class representing playwright's ElementHandles from /checkout-completed.html page\
 * See {@link https://playwright.dev/docs/api/class-elementhandle}
 */
class CompletedComponents {
    /**
     * Create the Checkout Completed ElementsHandle
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the checkout-completed's container ElementHandle
     * @returns {ElementHandle} ElementHandle for 'completedContainer' locator
     */
    async completedContainer() {
        return await this.page.$(completedLocators.completedContainer)
    }

    /**
     * Get the header text ElementHandle
     * @returns {ElementHandle} ElementHandle for 'completedHeaderText' locator
     */
    async completedHeaderText() {
        return await this.page.$(
            `${completedLocators.completedContainer}` + ">>" + `${completedLocators.completedHeaderText}`
        )
    }

    /**
     * Get the completed description text ElementHandle
     * @returns {ElementHandle} ElementHandle for 'completedText' locator
     */
    async completedText() {
        return await this.page.$(
            `${completedLocators.completedContainer}` + ">>" + `${completedLocators.completedText}`
        )
    }

    /**
     * Get the completed image ElementHandle
     * @returns {ElementHandle} ElementHandle for 'errorMessageText' locator
     */
    async completedImage() {
        return await this.page.$(
            `${completedLocators.completedContainer}` + ">>" + `${completedLocators.completedImage}`
        )
    }

    /**
     * Get the back to home button ElementHandle
     * @returns {ElementHandle} ElementHandle for 'completedBackButton' locator
     */
    async completedBackButton() {
        return await this.page.$(
            `${completedLocators.completedContainer}` + ">>" + `${completedLocators.completedBackButton}`
        )
    }
}

module.exports = {
    CompletedComponents,
    completedLocators,
}
