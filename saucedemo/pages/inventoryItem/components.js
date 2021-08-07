const inventoryItemLocators = {
  cartItemContainer: '[class="cart_item"]',
  itemContainer: '[class="inventory_item"]',
  itemNameText: '[class="inventory_item_name"]',
  itemDescriptionText: '[class="inventory_item_desc"]',
  itemPriceText: '[class="inventory_item_price"]',
  addToCartButton: 'text=/add to cart/i',
  removeButton: 'text=/remove/i',
}

class InventoryItemComponents {
  constructor(page) {
    this.page = page
  }

  switchItemLocator(fromPage) {
    switch (fromPage) {
      case 'cart':
        return inventoryItemLocators.cartItemContainer
      case 'inventory':
        return inventoryItemLocators.itemContainer
      default:
        return inventoryItemLocators.itemContainer
    }
  }

  async items(fromPage = 'inventory') {
    const locator = this.switchItemLocator(fromPage)
    return await this.page.$$(locator)
  }

  async itemsNameText(fromPage) {
    const locator = this.switchItemLocator(fromPage)
    return await this.page.$$(`${locator}` + '>>' + `${inventoryItemLocators.itemNameText}`)
  }

  async itemsPriceText(fromPage) {
    const locator = this.switchItemLocator(fromPage)
    return await this.page.$$(`${locator}` + '>>' + `${inventoryItemLocators.itemPriceText}`)
  }

  async removeItemsButton(fromPage) {
    const locator = this.switchItemLocator(fromPage)
    return await this.page.$$(`${locator}` + '>>' + `${inventoryItemLocators.removeButton}`)
  }
}

module.exports = {
  InventoryItemComponents,
  inventoryItemLocators,
}
