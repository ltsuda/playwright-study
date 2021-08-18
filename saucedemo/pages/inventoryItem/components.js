/* eslint-disable no-unused-vars */
const { Page, ElementHandle, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Inventory items' HTML selectors
 */
const inventoryItemSelectors = {
    cartItemContainer: ".cart_item",
    detailsItemContainer: ".inventory_details_container",
    itemContainer: ".inventory_item",
    itemNameText: ".inventory_item_name",
    itemDescriptionText: ".inventory_item_desc",
    itemPriceText: ".inventory_item_price",
    addToCartButton: "text=/add to cart/i",
    removeButton: "text=/remove/i",
    backToProductsButton: "[data-test='back-to-products']",
}

/**
 * Class representing playwright's ElementHandles/Locators for the inventory item elements\
 * See {@link https://playwright.dev/docs/api/class-elementhandle}\
 * See {@link https://playwright.dev/docs/api/class-locator}
 */
class InventoryItemComponents {
    /**
     * Create the Inventory item ElementsHandle/Locators
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Select which container selector based on the page
     * @returns {String} container locator
     */
    switchItemLocator(fromPage) {
        switch (fromPage) {
            case "cart":
                return inventoryItemSelectors.cartItemContainer
            case "inventory":
                return inventoryItemSelectors.itemContainer
            case "details":
                return inventoryItemSelectors.detailsItemContainer
            default:
                return inventoryItemSelectors.itemContainer
        }
    }

    /**
     * Get the inventory item detail's container Locator
     * @returns {Locator} Locator for 'detailsItemContainer' selector
     */
    async itemDetailContainer() {
        return await this.page.locator(inventoryItemSelectors.detailsItemContainer)
    }

    /**
     * Get the inventory item cart's container Locator
     * @returns {Locator} Locator for 'cartItemContainer' selector
     */
    async cartItemContainer() {
        return await this.page.locator(inventoryItemSelectors.cartItemContainer)
    }

    /**
     * Get a list of items container's ElementHandles/Locators
     * @returns {ElementHandle[]} a list of ElementHandle for the list of item's container locator
     */
    async items(fromPage = "inventory") {
        const locator = this.switchItemLocator(fromPage)
        return await this.page.$$(locator)
    }

    /**
     * Get a list of items name's ElementHandles/Locators
     * @returns {ElementHandle[]} a list of ElementHandle for a 'itemNameText' selector
     */
    async itemsNameText(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        const itemLocator =
            fromPage == "details"
                ? inventoryItemSelectors.itemNameText.replace("item", "details")
                : inventoryItemSelectors.itemNameText
        return await this.page.$$(`${locator}` + ">>" + `${itemLocator}`)
    }

    /**
     * Get a list of items price's ElementHandles/Locators
     * @returns {ElementHandle[]} a list of ElementHandle for a 'itemPriceText' selector
     */
    async itemsPriceText(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        const itemLocator =
            fromPage == "details"
                ? inventoryItemSelectors.itemPriceText.replace("_", "_details_")
                : inventoryItemSelectors.itemPriceText
        return await this.page.$$(`${locator}` + ">>" + `${itemLocator}`)
    }

    /**
     * Get the add to cart button Locator
     * @returns {Locator} Locator for 'addToCartButton' selector
     */
    async addToCartButton(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        return await this.page.locator(`${locator}` + ">>" + `${inventoryItemSelectors.addToCartButton}`)
    }

    /**
     * Get the remove from cart button Locator
     * @returns {Locator} Locator for 'removeButton' selector
     */
    async removeItemsButton(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        return await this.page.locator(`${locator}` + ">>" + `${inventoryItemSelectors.removeButton}`)
    }

    /**
     * Get the back to products button Locator
     * @returns {Locator} Locator for 'backToProductsButton' selector
     */
    async backToProductsButton() {
        return await this.page.locator(inventoryItemSelectors.backToProductsButton)
    }
}

module.exports = {
    InventoryItemComponents,
    inventoryItemSelectors,
}
