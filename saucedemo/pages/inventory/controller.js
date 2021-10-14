/* eslint-disable no-unused-vars */
const { Page, expect } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { PAGES } = require("../../utils/consts")
const { InventoryComponents, inventorySelectors } = require("./components")

/**
 * Class representing the Inventory's elements interations
 */
class InventoryController {
    /**
     * Create the Inventory controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {InventoryComponents} components - class with Locators of the Inventory page
     * @param {Object} selectors - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new InventoryComponents(this.page)
        this.selectors = inventorySelectors
    }

    /**
     * Navigate to the Inventory page and wait until network is idle
     */
    async navigate() {
        await this.page.goto(PAGES.INVENTORY, { waitUntil: "networkidle" })
    }

    /**
     * Validate if "inventoryContainer" element is visible
     */
    async screenIsVisible() {
        const inventoryContainerLocator = this.components.inventoryContainer()
        return await inventoryContainerLocator.isVisible()
    }
}

module.exports = { InventoryController }
