/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Inventory items' HTML selectors
 */
const inventoryItemSelectors = {
    detailsItemContainer: "data-test=inventory-details-container",
    itemContainer: "data-test=inventory-item",
    itemNameText: "data-test=item-name",
    itemDescriptionText: "data-test=item-description",
    itemPriceText: "data-test=item-price",
    addToCartButton: "[data-test^='button-add-to-cart']",
    removeButton: "[data-test^='button-remove']",
    backToProductsButton: "data-test=button-back-to-products",
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
     * Get the inventory item detail's container Locator
     * @returns {Locator} Locator for 'detailsItemContainer' selector
     */
    itemDetailContainer() {
        return this.page.locator(inventoryItemSelectors.detailsItemContainer)
    }

    /**
     * Get the inventory item container Locator
     * @returns {Locator} Locator for 'itemContainer' selector
     */
    itemContainer() {
        return this.page.locator(inventoryItemSelectors.itemContainer)
    }

    /**
     * Get item's container Locator
     * @returns {Locator} Locator for the item's container locator
     */
    items() {
        return this.page.locator(inventoryItemSelectors.itemContainer)
    }

    /**
     * Get item's name Locator
     * @returns {Locator} Locator for the 'itemNameText' selector
     */
    names() {
        const items = this.items()
        return items.locator(inventoryItemSelectors.itemNameText)
    }

    /**
     * Get item's price Locator
     * @returns {Locator} Locator for the 'itemPriceText' selector
     */
    prices() {
        const items = this.items()
        return items.locator(inventoryItemSelectors.itemPriceText)
    }

    /**
     * Get a item's container Locator by its name or index
     * @param {Number} picker - the item's index
     * @returns {Locator} Locator for an item based on its name or locator nth
     */
    item(picker) {
        const items = this.items()
        if (typeof picker === "string") {
            return items.locator(`text=${picker}`).first()
        } else {
            return items.nth(picker)
        }
    }

    /**
     * Get the add to cart button Locator
     * @returns {Locator} Locator for 'addToCartButton' selector
     */
    addToCartButton() {
        return this.page.locator(inventoryItemSelectors.addToCartButton)
    }

    /**
     * Get the remove from cart button Locator
     * @returns {Locator} Locator for 'removeButton' selector
     */
    removeItemsButton() {
        return this.page.locator(inventoryItemSelectors.removeButton)
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
