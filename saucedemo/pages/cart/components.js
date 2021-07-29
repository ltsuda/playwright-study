const cartLocators = {
  continueShopping: "[data-test='continue-shopping']",
  checkout: "[data-test='checkout']",
}

class CartComponents {
  constructor(page) {
    this.page = page
  }

  async continueShoppingButton() {
    return await this.page.$(cartLocators.continueShopping)
  }

  async checkoutButton() {
    return await this.page.$(cartLocators.checkout)
  }
}

module.exports = {
  CartComponents,
  cartLocators,
}
