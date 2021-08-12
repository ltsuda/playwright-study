const inventoryLocators = {
    inventoryContainer: "#inventory_container",
}

class InventoryComponents {
    constructor(page) {
        this.page = page
    }

    async inventoryContainer() {
        return await this.page.$(inventoryLocators.inventoryContainer)
    }
}

module.exports = {
    InventoryComponents,
    inventoryLocators,
}
