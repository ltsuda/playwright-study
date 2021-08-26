/* eslint-disable no-unused-vars */
const { Page, expect } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { CartComponents, cartSelectors } = require("./components")
const { PAGES } = require("../../utils/consts")

/**
 * Class representing the Cart's page interations
 */
class CartController {
    /**
     * Create the Cart controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {CartComponents} components - class with Locators of the Cart page
     * @param {Object} selectors - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new CartComponents(this.page)
        this.selectors = cartSelectors
    }

    /**
     * Navigate to the Cart page and wait until network is idle
     */
    async navigate() {
        await this.page.goto(PAGES.CART, { waitUntil: "networkidle" })
    }

    /**
     * Validate if "cartContainer" element is visible
     */
    async screenIsVisible() {
        const cartContainerElement = await this.components.cartContainer()
        await expect(cartContainerElement).toBeVisible()
    }

    /**
     * Click at the "Continue Shopping" button
     */
    async continueShopping() {
        const continueButton = await this.components.continueShoppingButton()
        await continueButton.click()
    }

    /**
     * Click at the "Checkout" button
     */
    async navigateToCheckout() {
        const checkoutButton = await this.components.checkoutButton()
        await checkoutButton.click()
    }
}

module.exports = {
    CartController,
    cartSelectors,
}
