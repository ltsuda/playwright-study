const inventoryItemLocators = {
  cartItem: "[class='cart_item']",
  item: "[class='inventory_item']",
  itemName: "[class='inventory_item_name']",
  itemImage: "[class='inventory_item_img'] >> img",
  itemDescription: "[class='inventory_item_desc']",
  itemPrice: "[class='inventory_item_price']",
  itemRemoveButton: "text=/remove/i",
}

class InventoryItemComponents {
  constructor(page) {
    this.page = page
  }

  switchItemLocator(fromPage) {
    switch (fromPage) {
      case "cart":
        return inventoryItemLocators.cartItem
      case "inventory":
        return inventoryItemLocators.item
      default:
        return inventoryItemLocators.item
    }
  }

  async items(fromPage = "inventory") {
    const locator = this.switchItemLocator(fromPage)
    return await this.page.$$(locator)
  }

  async itemsName() {
    return await this.page.$$(
      `${inventoryItemLocators.item}` +
        ">>" +
        `${inventoryItemLocators.itemName}`
    )
  }

  async itemsImage() {
    return await this.page.$$(
      `${inventoryItemLocators.item}` +
        ">>" +
        `${inventoryItemLocators.itemImage}`
    )
  }

  async itemsDescription() {
    return await this.page.$$(
      `${inventoryItemLocators.item}` +
        ">>" +
        `${inventoryItemLocators.itemDescription}`
    )
  }

  async itemsPrice() {
    return await this.page.$$(
      `${inventoryItemLocators.item}` +
        ">>" +
        `${inventoryItemLocators.itemPrice}`
    )
  }

  async removeItemButtons() {
    return await this.page.$$(
      `${inventoryItemLocators.item}` +
        ">>" +
        `${inventoryItemLocators.itemRemoveButton}`
    )
  }
}

module.exports = {
  InventoryItemComponents,
  inventoryItemLocators,
}
