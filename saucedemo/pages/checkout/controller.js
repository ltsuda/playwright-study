const { CheckoutComponents, checkoutLocators } = require('./components')
const { PAGES } = require('../../utils/consts')

class CheckoutController {
  constructor(page) {
    this.page = page
    this.components = new CheckoutComponents(this.page)
    this.locators = checkoutLocators
  }

  async navigate() {
    await this.page.goto(PAGES.CHECKOUT, 'networkidle')
  }

  async cancelCheckout() {
    const cancelElement = await this.components.cancelButton()
    await cancelElement.click()
  }

  async continueCheckout() {
    const continueElement = await this.components.continueButton()
    await continueElement.click()
  }

  async closeError() {
    const closeErrorElement = await this.components.closeErrorButton()
    await closeErrorElement.click()
  }

  async getErrorMessage() {
    const errorElement = await this.components.errorMessageText()
    return await errorElement.innerText()
  }

  async fillFirstName(firstName) {
    const firstNameElement = await this.components.firstNameInput()
    await firstNameElement.fill(firstName)
  }

  async fillLastName(lastName) {
    const lastNameElement = await this.components.lastNameInput()
    await lastNameElement.fill(lastName)
  }

  async fillPostalCode(postalCode) {
    const postalCodeElement = await this.components.postalCodeInput()
    await postalCodeElement.fill(postalCode)
  }
}

module.exports = {
  CheckoutController,
  checkoutLocators,
}
