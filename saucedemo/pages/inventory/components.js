const inventoryLocators = {
  addToCart: "text=/add to cart/i",
}

class InventoryComponents {
  constructor(page) {
    this.page = page
  }

  async addToCartButtons() {
    return await this.page.$$(
      `${inventoryLocators.items}` + ">>" + `${inventoryLocators.addToCart}`
    )
  }
}

module.exports = {
  InventoryComponents,
  inventoryLocators,
}
