const navigationBarLocators = {
  navContainer: '.header_container',
  navDetailContainer: '.header_container.inventory_details',
  sideMenu: '.bm-menu-wrap',
  menuButton: '#react-burger-menu-btn',
  menuCloseButton: '.bm-cross-button',
  menuAllItemsLink: '#inventory_sidebar_link',
  menuAboutLink: '#about_sidebar_link',
  menuLogoutLink: '#logout_sidebar_link',
  menuResetStateLink: '#reset_sidebar_link',
  cartLink: '[class="shopping_cart_link"]',
  cartBadgeText: '[class="shopping_cart_badge"]',
}

class NavigationBarComponents {
  constructor(page) {
    this.page = page
  }

  async navContainer() {
    return await this.page.$(navigationBarLocators.navContainer)
  }

  async navDetailContainer() {
    return await this.page.$(navigationBarLocators.navDetailContainer)
  }

  async sideMenu() {
    return await this.page.$(navigationBarLocators.sideMenu)
  }

  async menuButton() {
    return await this.page.$(navigationBarLocators.menuButton)
  }

  async menuCloseButton() {
    return await this.page.$(navigationBarLocators.menuCloseButton)
  }

  async menuAllItemsLink() {
    return await this.page.$(navigationBarLocators.menuAllItemsLink)
  }

  async menuAboutLink() {
    return await this.page.$(navigationBarLocators.menuAboutLink)
  }

  async menuLogoutLink() {
    return await this.page.$(navigationBarLocators.menuLogoutLink)
  }

  async menuResetStateLink() {
    return await this.page.$(navigationBarLocators.menuResetStateLink)
  }

  async cartLink() {
    return await this.page.$(navigationBarLocators.cartLink)
  }

  async cartBadgeText() {
    return await this.page.$(`${navigationBarLocators.cartLink}` + '>' + `${navigationBarLocators.cartBadgeText}`)
  }
}

module.exports = {
  NavigationBarComponents,
  navigationBarLocators,
}
