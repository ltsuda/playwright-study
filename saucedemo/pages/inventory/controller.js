/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { PAGES } = require("../../utils/consts")
const { InventoryComponents } = require("./components")

/**
 * Class representing the Inventory's elements interations
 */
class InventoryController {
    /**
     * Create the Inventory controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {InventoryComponents} components - class with elementsHandle of the Inventory page
     */
    constructor(page) {
        this.page = page
        this.components = new InventoryComponents(this.page)
    }

    /**
     * Navigate to the Inventory page and wait until network is idle
     */
    async navigate() {
        await this.page.goto(PAGES.INVENTORY, "networkidle")
    }

    /**
     * Validate if "inventoryContainer" element is visible
     */
    async screenIsVisible() {
        const inventoryContainerElement = await this.components.inventoryContainer()
        await inventoryContainerElement.isVisible()
    }
}

module.exports = { InventoryController }
