/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Cart's HTML selectors
 */
const cartSelectors = {
    cartContainer: "data-test=cart-container",
    continueShoppingButton: "data-test=button-continue-shopping",
    checkoutButton: "data-test=button-checkout",
}

/**
 * Class representing playwright's Locators from /cart.html page\
 * See {@link https://playwright.dev/docs/api/class-locator}
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
    cartContainer() {
        return this.page.locator(cartSelectors.cartContainer)
    }

    /**
     * Get the continue shopping button Locator
     * @returns {Locator} Locator for 'continueShoppingButton' selector
     */
    continueShoppingButton() {
        return this.page.locator(cartSelectors.continueShoppingButton)
    }

    /**
     * Get the checkout button Locator
     * @returns {Locator} Locator for 'checkoutButton' selector
     */
    checkoutButton() {
        return this.page.locator(cartSelectors.checkoutButton)
    }
}

module.exports = {
    CartComponents,
    cartSelectors,
}
