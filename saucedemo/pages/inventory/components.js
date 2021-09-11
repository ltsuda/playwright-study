/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Inventory's HTML selectors
 */
const inventorySelectors = {
    inventoryContainer: ".inventory_container",
}

/**
 * Class representing playwright's Locator from /inventory.html page\
 * See {@link https://playwright.dev/docs/api/class-locator}
 */
class InventoryComponents {
    /**
     * Create the Inventory Locator
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the inventory's container Locator
     * @returns {Locator} Locator for 'inventoryContainer' selector
     */
    async inventoryContainer() {
        return this.page.locator(inventorySelectors.inventoryContainer)
    }
}

module.exports = {
    InventoryComponents,
    inventorySelectors,
}
