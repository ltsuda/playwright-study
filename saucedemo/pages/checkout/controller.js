/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { CheckoutComponents, checkoutLocators } = require("./components")
const { PAGES, PERSONAL_INFO } = require("../../utils/consts")

/**
 * Class representing the Checkout's page interations
 */
class CheckoutController {
    /**
     * Create the Checkout controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {CheckoutComponents} components - class with elementsHandle of the Checkout page
     * @param {Object} locators - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new CheckoutComponents(this.page)
        this.locators = checkoutLocators
    }

    /**
     * Navigate to the Checkout page and wait until network is idle
     */
    async navigate() {
        await this.page.goto(PAGES.CHECKOUT, "networkidle")
    }

    /**
     * Validate if "checkoutContainer" element is visible
     */
    async screenIsVisible() {
        const checkoutContainerElement = await this.components.checkoutContainer()
        await checkoutContainerElement.isVisible()
    }

    /**
     * Click at the "Cancel checkout" button
     */
    async cancelCheckout() {
        const cancelElement = await this.components.cancelButton()
        await cancelElement.click()
    }

    /**
     * Click at the "Continue" button
     */
    async continueCheckout() {
        const continueElement = await this.components.continueButton()
        await continueElement.click()
    }

    /**
     * Get error message text
     * @returns checkout's error message
     */
    async getErrorMessage() {
        const errorElement = await this.components.errorMessageText()
        return await errorElement.innerText()
    }

    /**
     * Fill up First name input
     */
    async fillFirstName(firstName) {
        const firstNameElement = await this.components.firstNameInput()
        await firstNameElement.fill(firstName)
    }

    /**
     * Fill up Last name input
     */
    async fillLastName(lastName) {
        const lastNameElement = await this.components.lastNameInput()
        await lastNameElement.fill(lastName)
    }

    /**
     * Fill up Postal code input
     */
    async fillPostalCode(postalCode) {
        const postalCodeElement = await this.components.postalCodeInput()
        await postalCodeElement.fill(postalCode)
    }

    /**
     * Fill up first name, last name and postal code inputs and click at the "Continue" button
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
    checkoutLocators,
}
