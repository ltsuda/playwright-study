const inventoryLocators = {
  items: "[class='inventory_item']",
  itemsName: "[class='inventory_item_name']",
  itemsImage: "[class='inventory_item_img'] >> img",
  itemsDescription: "[class='inventory_item_desc']",
  itemsPrice: "[class='inventory_item_price']",
  sortItems: "[class='product_sort_container']",
  cart: "[class='shopping_cart_link']",
  cartBadge: "[class='shopping_cart_badge']",
  addToCart: "text=/add to cart/i",
  removeFromCart: "text=/remove/i",
  footerTwitter: ".footer >> .social_twitter > a",
  footerFacebook: ".footer >> .social_facebook > a",
  footerLinkdin: ".footer >> .social_linkedin > a",
}

class InventoryComponents {
  constructor(page) {
    this.page = page
  }

  async items() {
    return await this.page.$$(inventoryLocators.items)
  }

  async itemsName() {
    return await this.page.$$(
      `${inventoryLocators.items}` + ">>" + `${inventoryLocators.itemsName}`
    )
  }

  async itemsImage() {
    return await this.page.$$(
      `${inventoryLocators.items}` + ">>" + `${inventoryLocators.itemsImage}`
    )
  }

  async itemsDescription() {
    return await this.page.$$(
      `${inventoryLocators.items}` +
        ">>" +
        `${inventoryLocators.itemsDescription}`
    )
  }

  async itemsPrice() {
    return await this.page.$$(
      `${inventoryLocators.items}` + ">>" + `${inventoryLocators.itemsPrice}`
    )
  }

  async sortItems() {
    return await this.page.$(inventoryLocators.sortItems)
  }

  async cart() {
    return await this.page.$(inventoryLocators.cart)
  }

  async cartBadge() {
    return await this.page.$(
      `${inventoryLocators.cart}` + ">" + `${inventoryLocators.cartBadge}`
    )
  }

  async addToCartButtons() {
    return await this.page.$$(
      `${inventoryLocators.items}` + ">>" + `${inventoryLocators.addToCart}`
    )
  }

  async removeFromCartButtons() {
    return await this.page.$$(
      `${inventoryLocators.items}` +
        ">>" +
        `${inventoryLocators.removeFromCart}`
    )
  }

  async footerTwitter() {
    return await this.page.$(inventoryLocators.footerTwitter)
  }

  async footerFacebook() {
    return await this.page.$(inventoryLocators.footerFacebook)
  }

  async footerLinkdin() {
    return await this.page.$(inventoryLocators.footerLinkdin)
  }
}

module.exports = {
  InventoryComponents,
  inventoryLocators,
}
