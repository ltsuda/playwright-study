const navigationBarLocators = {
  menuButton: 'primary_header >> react-burger-menu-btn',
  menuCloseButton: 'primary_header >> bm-menu-wrap >> react-burger-cross-btn',
  menuAllItemsLink: 'primary_header >> bm-item-list > inventory_sidebar_link',
  menuAboutLink: 'primary_header >> bm-item-list > about_sidebar_link',
  menuLogoutLink: 'primary_header >> bm-item-list > logout_sidebar_link',
  menuResetStateLink: 'primary_header >> bm-item-list > reset_sidebar_link',
  cartLink: '[class="shopping_cart_link"]',
  cartBadgeText: '[class="shopping_cart_badge"]',
}

class NavigationBarComponents {
  constructor(page) {
    this.page = page
  }

  async menuButton() {
    return await this.page.$(this.navigationBarLocators.menuButton)
  }

  async menuCloseButton() {
    return await this.page.$(this.navigationBarLocators.menuCloseButton)
  }

  async menuAllItemsLink() {
    return await this.page.$(this.navigationBarLocators.menuAllItemsLink)
  }

  async menuAboutLink() {
    return await this.page.$(this.navigationBarLocators.menuAboutLink)
  }

  async menuLogoutLink() {
    return await this.page.$(this.navigationBarLocators.menuLogoutLink)
  }

  async menuResetStateLink() {
    return await this.page.$(this.navigationBarLocators.menuResetStateLink)
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
