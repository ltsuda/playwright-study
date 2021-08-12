const inventoryItemLocators = {
    cartItemContainer: ".cart_item",
    detailsItemContainer: "[class='inventory_details_container']",
    itemContainer: "[class='inventory_item']",
    itemNameText: ".inventory_item_name",
    itemDescriptionText: ".inventory_item_desc",
    itemPriceText: "[class='inventory_item_price']",
    addToCartButton: "text=/add to cart/i",
    removeButton: "text=/remove/i",
    backToProductsButton: "[data-test='back-to-products']",
}

class InventoryItemComponents {
    constructor(page) {
        this.page = page
    }

    switchItemLocator(fromPage) {
        switch (fromPage) {
        case "cart":
            return inventoryItemLocators.cartItemContainer
        case "inventory":
            return inventoryItemLocators.itemContainer
        case "details":
            return inventoryItemLocators.detailsItemContainer
        default:
            return inventoryItemLocators.itemContainer
        }
    }

    async itemDetailContainer() {
        return await this.page.$(inventoryItemLocators.detailsItemContainer)
    }

    async cartItemContainer() {
        return await this.page.$(inventoryItemLocators.cartItemContainer)
    }

    async items(fromPage = "inventory") {
        const locator = this.switchItemLocator(fromPage)
        return await this.page.$$(locator)
    }

    async itemsNameText(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        const itemLocator =
      fromPage == "details"
          ? inventoryItemLocators.itemNameText.replace("item", "details")
          : inventoryItemLocators.itemNameText
        return await this.page.$$(`${locator}` + ">>" + `${itemLocator}`)
    }

    async itemsPriceText(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        const itemLocator =
      fromPage == "details"
          ? inventoryItemLocators.itemPriceText.replace("_", "_details_")
          : inventoryItemLocators.itemPriceText
        return await this.page.$$(`${locator}` + ">>" + `${itemLocator}`)
    }

    async addToCartButton(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        return await this.page.$(`${locator}` + ">>" + `${inventoryItemLocators.addToCartButton}`)
    }

    async removeItemsButton(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        return await this.page.$$(`${locator}` + ">>" + `${inventoryItemLocators.removeButton}`)
    }

    async backToProductsButton() {
        return await this.page.$(inventoryItemLocators.backToProductsButton)
    }
}

module.exports = {
    InventoryItemComponents,
    inventoryItemLocators,
}
