const { CartComponents, cartLocators } = require('./components')
const { PAGES } = require('../../utils/consts')

class CartController {
  constructor(page) {
    this.page = page
    this.components = new CartComponents(this.page)
    this.locators = cartLocators
  }

  async navigate() {
    await this.page.goto(PAGES.CART, 'networkidle')
  }

  async screenIsVisible() {
    const cartContainerElement = await this.components.cartContainer()
    await cartContainerElement.isVisible()
  }

  async continueShopping() {
    const continueButton = await this.components.continueShoppingButton()
    await continueButton.click()
  }

  async navigateToCheckout() {
    const checkoutButton = await this.components.checkoutButton()
    await checkoutButton.click()
  }
}

module.exports = {
  CartController,
  cartLocators,
}
