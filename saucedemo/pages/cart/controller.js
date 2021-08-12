/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { CartComponents, cartLocators } = require("./components")
const { PAGES } = require("../../utils/consts")


/**
 * Class representing the Cart's page interations
 */
class CartController {
    /**
     * Create the Cart controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {CartComponents} components - class with elementsHandle of the Cart page
     * @param {Object} locators - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new CartComponents(this.page)
        this.locators = cartLocators
    }

    /**
     * Navigate to the Cart page and wait until network is idle
     */
    async navigate() {
        await this.page.goto(PAGES.CART, "networkidle")
    }

    /**
     * Validate if "cartContainer" element is visible
     */
    async screenIsVisible() {
        const cartContainerElement = await this.components.cartContainer()
        await cartContainerElement.isVisible()
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
    cartLocators,
}
