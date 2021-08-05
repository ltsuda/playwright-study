const { CheckoutComponents, checkoutLocators } = require('./components')
const { OverviewController } = require('../overview/controller')
const { NavigationBarController } = require('../navigationBar/controller')
const { TitleHeaderController } = require('../titleHeader/controller')

class CheckoutController {
  constructor(page) {
    this.page = page
    this.components = new CheckoutComponents(this.page)
    this.navigationBarController = new NavigationBarController(this.page)
    this.titleHeaderController = new TitleHeaderController(this.page)
    this.locators = checkoutLocators
  }

  async navigate() {
    await this.page.goto('/checkout-step-one.html')
  }

  async cancelCheckout() {
    const cancelElement = await this.components.cancelButton()
    await cancelElement.click()
    // TODO: How can I return CartController instance without circular dependency?
  }

  async continueCheckout() {
    const continueElement = await this.components.continueButton()
    await continueElement.click()
    return new OverviewController(this.page)
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
