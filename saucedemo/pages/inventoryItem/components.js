/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
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
    backToProductsButton: "data-test='back-to-products'",
}

/**
 * Class representing playwright's Locators for the inventory item elements\
 * See {@link https://playwright.dev/docs/api/class-locator}
 */
class InventoryItemComponents {
    /**
     * Create the Inventory item Locators
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
     itemDetailContainer() {
        return this.page.locator(inventoryItemSelectors.detailsItemContainer)
    }

    /**
     * Get the inventory item cart's container Locator
     * @returns {Locator} Locator for 'cartItemContainer' selector
     */
     cartItemContainer() {
        return this.page.locator(inventoryItemSelectors.cartItemContainer)
    }

    /**
     * Get item's container Locator
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {Locator} Locator for the item's container locator
     */
     items(fromPage = "inventory") {
        const locator = this.switchItemLocator(fromPage)
        return this.page.locator(locator)
    }

    /**
     * Get item's name Locator
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {Locator} Locator for the 'itemNameText' selector
     */
     names(fromPage = "inventory") {
        const items = this.items(fromPage)
        return items.locator(inventoryItemSelectors.itemNameText)
    }

    /**
     * Get item's price Locator
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {Locator} Locator for the 'itemPriceText' selector
     */
     prices(fromPage = "inventory") {
        const items = this.items(fromPage)
        return items.locator(inventoryItemSelectors.itemPriceText)
    }

    /**
     * Get a item's container Locator by its name or index
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     * @param {Number} picker - the item's index
     * @returns {Locator} Locator for an item based on its name or locator nth
     */
     item(fromPage = "inventory", picker) {
        const items = this.items(fromPage)
        if (typeof picker === "string") {
            return items.locator(`text=${picker}`).first()
        } else {
            return items.nth(picker)
        }
    }

    /**
     * Get the add to cart button Locator
     * @param {String} fromPage - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {Locator} Locator for 'addToCartButton' selector
     */
     addToCartButton(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        return this.page.locator(`${locator}` + ">>" + `${inventoryItemSelectors.addToCartButton}`)
    }

    /**
     * Get the remove from cart button Locator
     * @param {String} fromPage - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {Locator} Locator for 'removeButton' selector
     */
     removeItemsButton(fromPage) {
        const locator = this.switchItemLocator(fromPage)
        return this.page.locator(`${locator}` + ">>" + `${inventoryItemSelectors.removeButton}`)
    }

    /**
     * Get the back to products button Locator
     * @returns {Locator} Locator for 'backToProductsButton' selector
     */
     backToProductsButton() {
        return this.page.locator(inventoryItemSelectors.backToProductsButton)
    }
}

module.exports = {
    InventoryItemComponents,
    inventoryItemSelectors,
}
