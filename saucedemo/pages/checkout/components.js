/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Checkout's HTML selectors
 */
const checkoutSelectors = {
    checkoutContainer: ".checkout_info_container",
    checkoutForm: ".checkout_info",
    firstNameInput: "data-test='firstName'",
    lastNameInput: "data-test='lastName'",
    postalCodeInput: "data-test='postalCode'",
    cancelButton: "data-test='cancel'",
    continueButton: "data-test='continue'",
    errorMessageText: "data-test='error'",
}

/**
 * Class representing playwright's Locators from /checkout.html page\
 * See {@link https://playwright.dev/docs/api/class-locator}
 */
class CheckoutComponents {
    /**
     * Create the Checkout Locators
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the checkout's container Locator
     * @returns {Locator} Locator for 'checkoutContainer' selector
     */
     checkoutContainer() {
        return this.page.locator(checkoutSelectors.checkoutContainer)
    }

    /**
     * Get the cancel button Locator
     * @returns {Locator} Locator for 'cancelButton' selector
     */
     cancelButton() {
        return this.page.locator(checkoutSelectors.cancelButton)
    }

    /**
     * Get the continue button Locator
     * @returns {Locator} Locator for 'continueButton' selector
     */
     continueButton() {
        return this.page.locator(checkoutSelectors.continueButton)
    }

    /**
     * Get the error message text Locator
     * @returns {Locator} Locator for 'errorMessageText' selector
     */
     errorMessageText() {
        return this.page.locator(checkoutSelectors.errorMessageText)
    }

    /**
     * Get the first name input Locator
     * @returns {Locator} Locator for 'firstNameInput' selector
     */
     firstNameInput() {
        return this.page.locator(`${checkoutSelectors.checkoutForm}` + ">>" + `${checkoutSelectors.firstNameInput}`)
    }

    /**
     * Get the last name input Locator
     * @returns {Locator} Locator for 'lastNameInput' selector
     */
     lastNameInput() {
        return this.page.locator(`${checkoutSelectors.checkoutForm}` + ">>" + `${checkoutSelectors.lastNameInput}`)
    }

    /**
     * Get the postal code input Locator
     * @returns {Locator} Locator for 'postalCodeInput' selector
     */
     postalCodeInput() {
        return this.page.locator(`${checkoutSelectors.checkoutForm}` + ">>" + `${checkoutSelectors.postalCodeInput}`)
    }
}

module.exports = {
    CheckoutComponents,
    checkoutSelectors,
}
