/* eslint-disable no-unused-vars */
const { Page, ElementHandle } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Cart's HTML selectors
 */
const cartLocators = {
    cartContainer: ".cart_contents_container",
    continueShoppingButton: "[data-test='continue-shopping']",
    checkoutButton: "[data-test='checkout']",
}

/**
 * Class representing playwright's ElementHandles from /cart.html page\
 * See {@link https://playwright.dev/docs/api/class-elementhandle}
 */
class CartComponents {
    /**
     * Create the Cart ElementsHandle
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the cart's container ElementHandle
     * @returns {ElementHandle} ElementHandle for 'cartContainer' locator
     */
    async cartContainer() {
        return await this.page.$(cartLocators.cartContainer)
    }

    /**
     * Get the continue shopping button ElementHandle
     * @returns {ElementHandle} ElementHandle for 'continueShoppingButton' locator
     */
    async continueShoppingButton() {
        return await this.page.$(cartLocators.continueShoppingButton)
    }

    /**
     * Get the checkout button ElementHandle
     * @returns {ElementHandle} ElementHandle for 'checkoutButton' locator
     */
    async checkoutButton() {
        return await this.page.$(cartLocators.checkoutButton)
    }
}

module.exports = {
    CartComponents,
    cartLocators,
}
