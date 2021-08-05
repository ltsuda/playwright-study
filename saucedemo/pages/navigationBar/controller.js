const { NavigationBarComponents, navigationBarLocators } = require('./components')
const { LoginController } = require('../login/controller')

class NavigationBarController {
  constructor(page) {
    this.page = page
    this.components = new NavigationBarComponents(this.page)
    this.locators = navigationBarLocators
  }

  async openMenu() {
    const menuElement = this.components.menuButton()
    await menuElement.click()
  }

  async closeMenu() {
    const closeMenuElement = this.components.menuCloseButton()
    await closeMenuElement.click()
  }

  async navigateToInventory() {
    const closeMenuElement = this.components.menuAllItemsLink()
    await closeMenuElement.click()
  }

  async navigateToSauceLabsSite() {
    const closeMenuElement = this.components.menuAboutLink()
    await closeMenuElement.click()
  }

  async logout() {
    const closeMenuElement = this.components.menuLogoutLink()
    await closeMenuElement.click()
    return new LoginController(this.page)
  }

  async resetState() {
    const closeMenuElement = this.components.menuResetStateLink()
    await closeMenuElement.click()
  }

  async getCartBadgeIfExists() {
    const badgeElement = await this.components.cartBadgeText()
    if ((await badgeElement) == null) {
      return null
    }
    return await badgeElement.innerText()
  }

  async navigateToCart() {
    const cartButtonElement = await this.components.cartLink()
    await cartButtonElement.click()
  }
}

module.exports = { NavigationBarController }
