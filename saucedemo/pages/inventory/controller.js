const { PAGES } = require("../../utils/consts")
const { InventoryComponents } = require("./components")

class InventoryController {
    constructor(page) {
        this.page = page
        this.components = new InventoryComponents(this.page)
    }

    async navigate() {
        await this.page.goto(PAGES.INVENTORY, "networkidle")
    }

    async screenIsVisible() {
        const inventoryContainerElement = await this.components.inventoryContainer()
        await inventoryContainerElement.isVisible()
    }
}

module.exports = { InventoryController }
