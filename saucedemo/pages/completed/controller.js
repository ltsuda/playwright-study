const { CompletedComponents, completedLocators } = require("./components")
const { InventoryController } = require("../inventory/controller")

class CompletedController {
  constructor(page) {
    this.page = page
    this.components = new CompletedComponents(this.page)
    this.locators = completedLocators
  }

  async backHome() {
    const backHomeButton = await this.components.completedBackButton()
    await backHomeButton.click()
    return new InventoryController(this.page)
  }

  async getHeaderText() {
    const headerElement = await this.components.completedHeader()
    return await headerElement.innerText()
  }

  async getCompletedText() {
    const completedElement = await this.components.completedText()
    return await completedElement.innerText()
  }

  async getCompletedImage() {
    const imageElement = await this.components.completedImage()
    return await imageElement.getAttribute("src")
  }
}

module.exports = {
  CompletedController,
  completedLocators,
}
