const checkoutLocators = {
  checkoutForm: "[class='checkout_info']",
  firstName: "[data-test='firstName']",
  lastName: "[data-test='lastName']",
  postalCode: "[data-test='postalCode']",
  cancelButton: "[data-test='cancel']",
  continueButton: "[data-test='continue']",
  errorMessage: "[data-test='error']",
  errorButton: "[data-test='error-button']",
}

class CheckoutComponents {
  constructor(page) {
    this.page = page
  }

  async cancelButton() {
    return await this.page.$(checkoutLocators.cancelButton)
  }

  async continueButton() {
    return await this.page.$(checkoutLocators.continueButton)
  }

  async closeErrorButton() {
    return this.page.$(checkoutLocators.errorButton)
  }

  async errorMessage() {
    return this.page.$(checkoutLocators.errorMessage)
  }

  async firstNameInput() {
    return this.page.$(
      `${checkoutLocators.checkoutForm}` +
        ">>" +
        `${checkoutLocators.firstName}`
    )
  }

  async lastNameInput() {
    return this.page.$(
      `${checkoutLocators.checkoutForm}` + ">>" + `${checkoutLocators.lastName}`
    )
  }

  async postalCodeInput() {
    return this.page.$(
      `${checkoutLocators.checkoutForm}` +
        ">>" +
        `${checkoutLocators.postalCode}`
    )
  }
}

module.exports = {
  CheckoutComponents,
  checkoutLocators,
}
