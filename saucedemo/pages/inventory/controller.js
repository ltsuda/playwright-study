class InventoryController {
  constructor(page) {
    this.page = page
  }

  async navigate() {
    await this.page.goto('/inventory.html')
  }
}

module.exports = { InventoryController }
