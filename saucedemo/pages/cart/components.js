const cartLocators = {
  continueShoppingButton: "[data-test='continue-shopping']",
  checkoutButton: "[data-test='checkout']",
}

class CartComponents {
  constructor(page) {
    this.page = page
  }

  async continueShoppingButton() {
    return await this.page.$(cartLocators.continueShoppingButton)
  }

  async checkoutButton() {
    return await this.page.$(cartLocators.checkoutButton)
  }
}

module.exports = {
  CartComponents,
  cartLocators,
}
