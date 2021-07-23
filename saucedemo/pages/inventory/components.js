const inventoryLocators = {
  items: "[class='inventory_item']",
  itemsName: "[class='inventory_item_name']",
  itemsImage: "[class='inventory_item_img'] >> img",
  itemsDescription: "[class='inventory_item_desc']",
  itemsPrice: "[class='inventory_item_price']",
  sortItems: "[class='product_sort_container']",
  addToCart: "text=/add to cart/i",
  removeFromCart: "text=/remove/i",
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
}

module.exports = {
  InventoryComponents,
  inventoryLocators,
}
