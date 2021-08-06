const { PAGES } = require('../../utils/consts')

class InventoryController {
  constructor(page) {
    this.page = page
  }

  async navigate() {
    await this.page.goto(PAGES.INVENTORY, 'networkidle')
  }
}

module.exports = { InventoryController }
