const { CompletedComponents, completedLocators } = require('./components')
const { InventoryController } = require('../inventory/controller')
const { NavigationBarController } = require('../navigationBar/controller')
const { TitleHeaderController } = require('../titleHeader/controller')

class CompletedController {
  constructor(page) {
    this.page = page
    this.components = new CompletedComponents(this.page)
    this.navigationBarController = new NavigationBarController(this.page)
    this.titleHeaderController = new TitleHeaderController(this.page)
    this.locators = completedLocators
  }

  async navigateBackHome() {
    const backHomeButton = await this.components.completedBackButton()
    await backHomeButton.click()
    return new InventoryController(this.page)
  }

  async getHeaderText() {
    const headerElement = await this.components.completedHeaderText()
    return await headerElement.innerText()
  }

  async getCompletedText() {
    const completedElement = await this.components.completedText()
    return await completedElement.innerText()
  }

  async getCompletedImage() {
    const imageElement = await this.components.completedImage()
    return await imageElement.getAttribute('src')
  }
}

module.exports = {
  CompletedController,
  completedLocators,
}
