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

class CheckoutComponents {
    constructor(page) {
        this.page = page
    }

    async checkoutContainer() {
        return await this.page.$(checkoutLocators.checkoutContainer)
    }

    async cancelButton() {
        return await this.page.$(checkoutLocators.cancelButton)
    }

    async continueButton() {
        return await this.page.$(checkoutLocators.continueButton)
    }

    async errorMessageText() {
        return this.page.$(checkoutLocators.errorMessageText)
    }

    async firstNameInput() {
        return this.page.$(`${checkoutLocators.checkoutForm}` + ">>" + `${checkoutLocators.firstNameInput}`)
    }

    async lastNameInput() {
        return this.page.$(`${checkoutLocators.checkoutForm}` + ">>" + `${checkoutLocators.lastNameInput}`)
    }

    async postalCodeInput() {
        return this.page.$(`${checkoutLocators.checkoutForm}` + ">>" + `${checkoutLocators.postalCodeInput}`)
    }
}

module.exports = {
    CheckoutComponents,
    checkoutLocators,
}
