/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Cart's HTML selectors
 */
const cartSelectors = {
    cartContainer: ".cart_contents_container",
    continueShoppingButton: "[data-test='continue-shopping']",
    checkoutButton: "[data-test='checkout']",
}

/**
 * Class representing playwright's Locators from /cart.html page\
 * See {@link https://playwright.dev/docs/api/class-Locator}
 */
class CartComponents {
    /**
     * Create the Cart Locators
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the cart's container Locator
     * @returns {Locator} Locator for 'cartContainer' selector
     */
    async cartContainer() {
        return await this.page.locator(cartSelectors.cartContainer)
    }

    /**
     * Get the continue shopping button Locator
     * @returns {Locator} Locator for 'continueShoppingButton' selector
     */
    async continueShoppingButton() {
        return await this.page.locator(cartSelectors.continueShoppingButton)
    }

    /**
     * Get the checkout button Locator
     * @returns {Locator} Locator for 'checkoutButton' selector
     */
    async checkoutButton() {
        return await this.page.locator(cartSelectors.checkoutButton)
    }
}

module.exports = {
    CartComponents,
    cartSelectors,
}
