const { CartComponents, cartLocators } = require('./components')

class CartController {
  constructor(page) {
    this.page = page
    this.components = new CartComponents(this.page)
    this.locators = cartLocators
  }

  async navigate() {
    await this.page.goto('/cart.html', 'networkidle')
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
