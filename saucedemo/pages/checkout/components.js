/* eslint-disable no-unused-vars */
const { Page, ElementHandle } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Checkout's HTML selectors
 */
const checkoutLocators = {
    checkoutContainer: ".checkout_info_container",
    checkoutForm: "[class='checkout_info']",
    firstNameInput: "[data-test='firstName']",
    lastNameInput: "[data-test='lastName']",
    postalCodeInput: "[data-test='postalCode']",
    cancelButton: "[data-test='cancel']",
    continueButton: "[data-test='continue']",
    errorMessageText: "[data-test='error']",
}

/**
 * Class representing playwright's ElementHandles from /checkout.html page\
 * See {@link https://playwright.dev/docs/api/class-elementhandle}
 */
class CheckoutComponents {
    /**
     * Create the Checkout ElementsHandle
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the checkout's container ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'checkoutContainer' locator
     */
    async checkoutContainer() {
        return await this.page.$(checkoutLocators.checkoutContainer)
    }

    /**
     * Get the checkout's cancel button ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'cancelButton' locator
     */
    async cancelButton() {
        return await this.page.$(checkoutLocators.cancelButton)
    }

    /**
     * Get the checkout's continue button ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'continueButton' locator
     */
    async continueButton() {
        return await this.page.$(checkoutLocators.continueButton)
    }

    /**
     * Get the checkout's error message text ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'errorMessageText' locator
     */
    async errorMessageText() {
        return this.page.$(checkoutLocators.errorMessageText)
    }

    /**
     * Get the checkout's first name input ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'firstNameInput' locator
     */
    async firstNameInput() {
        return this.page.$(`${checkoutLocators.checkoutForm}` + ">>" + `${checkoutLocators.firstNameInput}`)
    }

    /**
     * Get the checkout's last name input ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'lastNameInput' locator
     */
    async lastNameInput() {
        return this.page.$(`${checkoutLocators.checkoutForm}` + ">>" + `${checkoutLocators.lastNameInput}`)
    }

    /**
     * Get the checkout's postal code input ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'postalCodeInput' locator
     */
    async postalCodeInput() {
        return this.page.$(`${checkoutLocators.checkoutForm}` + ">>" + `${checkoutLocators.postalCodeInput}`)
    }
}

module.exports = {
    CheckoutComponents,
    checkoutLocators,
}
