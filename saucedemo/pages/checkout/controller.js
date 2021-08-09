const { CheckoutComponents, checkoutLocators } = require('./components')
const { PAGES, PERSONAL_INFO } = require('../../utils/consts')

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
