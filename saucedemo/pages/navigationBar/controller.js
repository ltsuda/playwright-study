const { NavigationBarComponents, navigationBarLocators } = require('./components')

class NavigationBarController {
  constructor(page) {
    this.page = page
    this.components = new NavigationBarComponents(this.page)
    this.locators = navigationBarLocators
  }

  async openMenu() {
    const menuElement = await this.components.menuButton()
    await menuElement.click()
  }

  async closeMenu() {
    const closeMenuElement = await this.components.menuCloseButton()
    await closeMenuElement.click()
  }

  async allItems() {
    const allItemMenuElement = await this.components.menuAllItemsLink()
    await allItemMenuElement.click()
  }

  async about() {
    const aboutElement = await this.components.menuAboutLink()
    await aboutElement.click()
  }

  async logout() {
    const logoutMenuElement = await this.components.menuLogoutLink()
    await logoutMenuElement.click()
  }

  async resetState() {
    const resetMenuElement = await this.components.menuResetStateLink()
    await resetMenuElement.click()
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

  async isSidemenuVisible() {
    const sideMenuElement = await this.components.sideMenu()
    return await sideMenuElement.isVisible()
  }
}

module.exports = { NavigationBarController }
