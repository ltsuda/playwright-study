const { InventoryController } = require("../inventory/controller")
const { CartComponents, cartLocators } = require("./components")
const { PrimaryHeaderController } = require("../primaryHeader/controller")
const { SecondaryHeaderController } = require("../secondaryHeader/controller")

class CartController {
  constructor(page) {
    this.page = page
    this.components = new CartComponents(this.page)
    this.primaryHeaderController = new PrimaryHeaderController(this.page)
    this.secondaryHeaderController = new SecondaryHeaderController(this.page)
    this.locators = cartLocators
  }

  async navigate() {
    await this.page.goto(
      process.env.SAUCE_CART_URL || "https://www.saucedemo.com/cart.html"
    )
  }

  async continueShopping() {
    const continueButton = await this.components.continueShoppingButton()
    await continueButton.click()
    return new InventoryController(this.page)
  }

  async goToCheckout() {
    const checkoutButton = await this.components.checkoutButton()
    await checkoutButton.click()
  }
}

module.exports = {
  CartController,
  cartLocators,
}
