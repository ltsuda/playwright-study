const primaryHeaderLocators = {
  menuButton: "primary_header >> react-burger-menu-btn",
  menuCloseButton:
    "primary_header >> bm-menu-wrap >> react-burger-cross-btn",
  menuAllItemsLink:
    "primary_header >> bm-item-list > inventory_sidebar_link",
  menuAboutLink:
    "primary_header >> bm-item-list > about_sidebar_link",
  menuLogoutLink:
    "primary_header >> bm-item-list > logout_sidebar_link",
  menuResetStateLink:
    "primary_header >> bm-item-list > reset_sidebar_link",
  cartLink: "[class='shopping_cart_link']",
  cartBadgeText: "[class='shopping_cart_badge']",
}

class PrimaryHeaderComponents {
  constructor(page) {
    this.page = page
  }

  async menuButton() {
    return await this.page.$(this.primaryHeaderLocators.menuButton)
  }

  async menuCloseButton() {
    return await this.page.$(
      this.primaryHeaderLocators.menuCloseButton
    )
  }

  async menuAllItemsLink() {
    return await this.page.$(
      this.primaryHeaderLocators.menuAllItemsLink
    )
  }

  async menuAboutLink() {
    return await this.page.$(this.primaryHeaderLocators.menuAboutLink)
  }

  async menuLogoutLink() {
    return await this.page.$(
      this.primaryHeaderLocators.menuLogoutLink
    )
  }

  async menuResetStateLink() {
    return await this.page.$(
      this.primaryHeaderLocators.menuResetStateLink
    )
  }

  async cartLink() {
    return await this.page.$(primaryHeaderLocators.cartLink)
  }

  async cartBadgeText() {
    return await this.page.$(
      `${primaryHeaderLocators.cartLink}` +
        ">" +
        `${primaryHeaderLocators.cartBadgeText}`
    )
  }
}

module.exports = {
  PrimaryHeaderComponents,
  primaryHeaderLocators,
}
