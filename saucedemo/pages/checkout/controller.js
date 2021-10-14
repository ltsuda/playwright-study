/* eslint-disable no-unused-vars */
const { Page, expect } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { CheckoutComponents, checkoutSelectors } = require("./components")
const { PAGES, PERSONAL_INFO } = require("../../utils/consts")

/**
 * Class representing the Checkout's page interations
 */
class CheckoutController {
    /**
     * Create the Checkout controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {CheckoutComponents} components - class with Locators of the Checkout page
     * @param {Object} selectors - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new CheckoutComponents(this.page)
        this.selectors = checkoutSelectors
    }

    /**
     * Navigate to the Checkout page and wait until network is idle
     */
    async navigate() {
        await this.page.goto(PAGES.CHECKOUT, { waitUntil: "networkidle" })
    }

    /**
     * Validate if "checkoutContainer" element is visible
     */
    async screenIsVisible() {
        const checkoutContainerElement = this.components.checkoutContainer()
        return await checkoutContainerElement.isVisible()
    }

    /**
     * Click at the Cancel checkout button
     */
    async cancelCheckout() {
        const cancelElement = this.components.cancelButton()
        await cancelElement.click()
    }

    /**
     * Click at the Continue button
     */
    async continueCheckout() {
        const continueElement = this.components.continueButton()
        await continueElement.click()
    }

    /**
     * Fill up First name input
     */
    async fillFirstName(firstName) {
        const firstNameElement = this.components.firstNameInput()
        await firstNameElement.type(firstName)
    }

    /**
     * Fill up Last name input
     */
    async fillLastName(lastName) {
        const lastNameElement = this.components.lastNameInput()
        await lastNameElement.type(lastName)
    }

    /**
     * Fill up Postal code input
     */
    async fillPostalCode(postalCode) {
        const postalCodeElement = this.components.postalCodeInput()
        await postalCodeElement.type(postalCode)
    }

    /**
     * Fill up first name, last name and postal code inputs and click at the Continue button
     */
    async submitCheckout(
        firstName = PERSONAL_INFO.USER1.FIRST_NAME,
        lastName = PERSONAL_INFO.USER1.LAST_NAME,
        postalCode = PERSONAL_INFO.USER1.ZIP
    ) {
        await this.fillFirstName(firstName)
        await this.fillLastName(lastName)
        await this.fillPostalCode(postalCode)
        await this.continueCheckout()
    }
}

module.exports = {
    CheckoutController,
    checkoutSelectors,
}
