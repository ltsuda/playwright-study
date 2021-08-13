/* eslint-disable no-unused-vars */
const { Page, ElementHandle } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Inventory items' HTML selectors
 */
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

/**
 * Class representing playwright's ElementHandles for the inventory item elements\
 * See {@link https://playwright.dev/docs/api/class-elementhandle}
 */
class InventoryItemComponents {
    /**
     * Create the Inventory item ElementsHandle
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Select which container selector based on the page
     * @returns {ElementHandle} ElementHandle for a container locator
     */
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

    /**
     * Get the inventory item detail's container ElementHandle
     * @returns {ElementHandle} ElementHandle for 'detailsItemContainer' locator
     */
    async itemDetailContainer() {
        return await this.page.$(inventoryItemLocators.detailsItemContainer)
    }

    /**
     * Get the inventory item cart's container ElementHandle
     * @returns {ElementHandle} ElementHandle for 'cartItemContainer' locator
     */
    async cartItemContainer() {
        return await this.page.$(inventoryItemLocators.cartItemContainer)
    }

    /**
     * Get a list of items container's ElementHandles
     * @returns {ElementHandle[]} a list of ElementHandle for the list of item's container locator
     */
    async items(fromPage = "inventory") {
        const locator = this.switchItemLocator(fromPage)
        return await this.page.$$(locator)
    }

    /**
     * Get a list of items name's ElementHandles
     * @returns {ElementHandle[]} a list of ElementHandle for a 'itemNameText' locator
     */
    async itemsNameText(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        const itemLocator =
      fromPage == "details"
          ? inventoryItemLocators.itemNameText.replace("item", "details")
          : inventoryItemLocators.itemNameText
        return await this.page.$$(`${locator}` + ">>" + `${itemLocator}`)
    }

    /**
     * Get a list of items price's ElementHandles
     * @returns {ElementHandle[]} a list of ElementHandle for a 'itemPriceText' locator
     */
    async itemsPriceText(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        const itemLocator =
      fromPage == "details"
          ? inventoryItemLocators.itemPriceText.replace("_", "_details_")
          : inventoryItemLocators.itemPriceText
        return await this.page.$$(`${locator}` + ">>" + `${itemLocator}`)
    }

    /**
     * Get the add to cart button ElementHandle
     * @returns {ElementHandle} ElementHandle for 'addToCartButton' locator
     */
    async addToCartButton(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        return await this.page.$(`${locator}` + ">>" + `${inventoryItemLocators.addToCartButton}`)
    }

    /**
     * Get the remove from cart button ElementHandle
     * @returns {ElementHandle} ElementHandle for 'removeButton' locator
     */
    async removeItemsButton(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        return await this.page.$$(`${locator}` + ">>" + `${inventoryItemLocators.removeButton}`)
    }

    /**
     * Get the back to products button ElementHandle
     * @returns {ElementHandle} ElementHandle for 'backToProductsButton' locator
     */
    async backToProductsButton() {
        return await this.page.$(inventoryItemLocators.backToProductsButton)
    }
}

module.exports = {
    InventoryItemComponents,
    inventoryItemLocators,
}
