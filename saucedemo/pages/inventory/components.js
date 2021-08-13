/* eslint-disable no-unused-vars */
const { Page, ElementHandle } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Inventory's HTML selectors
 */
const inventoryLocators = {
    inventoryContainer: "#inventory_container",
}

/**
 * Class representing playwright's ElementHandles from /inventory.html page\
 * See {@link https://playwright.dev/docs/api/class-elementhandle}
 */
class InventoryComponents {

    /**
     * Create the Inventory ElementsHandle
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the inventory's container ElementHandle
     * @returns {ElementHandle} ElementHandle for 'inventoryContainer' locator
     */
    async inventoryContainer() {
        return await this.page.$(inventoryLocators.inventoryContainer)
    }
}

module.exports = {
    InventoryComponents,
    inventoryLocators,
}
