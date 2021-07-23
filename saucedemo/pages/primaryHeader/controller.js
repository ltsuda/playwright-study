const {
  PrimaryHeaderComponents,
  primaryHeaderLocators,
} = require("./components")
const { InventoryController } = require("../inventory/controller")
const { LoginController } = require("../login/controller")

class PrimaryHeaderController {
  constructor(page) {
    this.page = page
    this.components = new PrimaryHeaderComponents(this.page)
    this.locators = primaryHeaderLocators
  }

  async openHamburguerMenu() {
    const menuElement = this.components.hamburguerMenuButton()
    await menuElement.click()
  }

  async closeHamburguerMenu() {
    const closeMenuElement = this.components.closeHamburguerMenu()
    await closeMenuElement.click()
  }

  async goToInventoryPage() {
    const closeMenuElement = this.components.hamburguerMenuAllItemsLink()
    await closeMenuElement.click()
    return new InventoryController(this.page)
  }

  async goToSauceLabsSite() {
    const closeMenuElement = this.components.hamburguerMenuAboutLink()
    await closeMenuElement.click()
  }

  async logout() {
    const closeMenuElement = this.components.hamburguerMenuLogoutLink()
    await closeMenuElement.click()
    return new LoginController(this.page)
  }

  async resetState() {
    const closeMenuElement = this.components.resetState()
    await closeMenuElement.click()
  }

  async getCartBadgeIfExists() {
    const badgeElement = await this.components.cartBadge()
    if ((await badgeElement) == null) {
      return null
    }
    return await badgeElement.innerText()
  }

  async goToCart() {
    const cartButtonElement = await this.components.cartLink()
    await cartButtonElement.click()
  }
}
module.exports = { PrimaryHeaderController }
