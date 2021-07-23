const primaryHeaderLocators = {
  hamburguerMenuButton: "primary_header >> react-burger-menu-btn",
  hamburguerMenuCloseButton:
    "primary_header >> bm-menu-wrap >> react-burger-cross-btn",
  hamburguerMenuAllItemsLink:
    "primary_header >> bm-item-list > inventory_sidebar_link",
  hamburguerMenuAboutLink:
    "primary_header >> bm-item-list > about_sidebar_link",
  hamburguerMenuLogoutLink:
    "primary_header >> bm-item-list > logout_sidebar_link",
  hamburguerMenuResetStateLink:
    "primary_header >> bm-item-list > reset_sidebar_link",
  cartLink: "[class='shopping_cart_link']",
  cartBadge: "[class='shopping_cart_badge']",
}

class PrimaryHeaderComponents {
  constructor(page) {
    this.page = page
  }

  async hamburguerMenuButton() {
    return await this.page.$(this.primaryHeaderLocators.hamburguerMenuButton)
  }

  async hamburguerMenuCloseButton() {
    return await this.page.$(
      this.primaryHeaderLocators.hamburguerMenuCloseButton
    )
  }

  async hamburguerMenuAllItemsLink() {
    return await this.page.$(
      this.primaryHeaderLocators.hamburguerMenuAllItemsLink
    )
  }

  async hamburguerMenuAboutLink() {
    return await this.page.$(this.primaryHeaderLocators.hamburguerMenuAboutLink)
  }

  async hamburguerMenuLogoutLink() {
    return await this.page.$(
      this.primaryHeaderLocators.hamburguerMenuLogoutLink
    )
  }

  async hamburguerMenuResetStateLink() {
    return await this.page.$(
      this.primaryHeaderLocators.hamburguerMenuResetStateLink
    )
  }

  async cartLink() {
    return await this.page.$(inventoryLocators.cart)
  }

  async cartBadge() {
    return await this.page.$(
      `${inventoryLocators.cart}` + ">" + `${inventoryLocators.cartBadge}`
    )
  }
}

module.exports = {
  PrimaryHeaderComponents,
  primaryHeaderLocators,
}
