const { InventoryController } = require('../inventory/controller')
const { CartComponents, cartLocators } = require('./components')
const { NavigationBarController } = require('../navigationBar/controller')
const { TitleHeaderController } = require('../titleHeader/controller')
const { InventoryItemController } = require('../inventoryItem/controller')
const { CheckoutController } = require('../checkout/controller')

class CartController {
  constructor(page) {
    this.page = page
    this.components = new CartComponents(this.page)
    this.itemController = new InventoryItemController(this.page)
    this.navigationBarController = new NavigationBarController(this.page)
    this.titleHeaderController = new TitleHeaderController(this.page)
    this.locators = cartLocators
    this.itemLocators = this.itemController.locators
  }

  async navigate() {
    await this.page.goto('/cart.html')
  }

  async continueShopping() {
    const continueButton = await this.components.continueShoppingButton()
    await continueButton.click()
    return new InventoryController(this.page)
  }

  async navigateToCheckout() {
    const checkoutButton = await this.components.checkoutButton()
    await checkoutButton.click()
    return new CheckoutController(this.page)
  }
}

module.exports = {
  CartController,
  cartLocators,
}
