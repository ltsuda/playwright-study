const { inventoryLocators } = require('./components')
const { InventoryItemController } = require('../inventoryItem/controller')
const { NavigationBarController } = require('../navigationBar/controller')
const { TitleHeaderController } = require('../titleHeader/controller')
const { FooterController } = require('../footer/controller')
const { randomInt } = require('../../utils/utils')

const sortOptions = Object.freeze({
  A_Z: 'az',
  Z_A: 'za',
  LowHigh: 'lohi',
  HighLow: 'hilo',
})

class InventoryController {
  constructor(page) {
    this.page = page
    this.itemController = new InventoryItemController(this.page)
    this.navigationBarController = new NavigationBarController(this.page)
    this.titleHeaderController = new TitleHeaderController(this.page)
    this.footerController = new FooterController(this.page)
    this.itemLocators = this.itemController.locators
    this.locators = inventoryLocators
  }

  async navigate() {
    await this.page.goto('/inventory.html')
  }

  async _sortItems(option) {
    const sortElement = await this.titleHeaderController.components.sortDropdown()
    await sortElement.selectOption(option)
  }

  async sortAZ() {
    await this._sortItems(sortOptions.A_Z)
  }

  async sortZA() {
    await this._sortItems(sortOptions.Z_A)
  }

  async sortLowHigh() {
    await this._sortItems(sortOptions.LowHigh)
  }

  async sortHighLow() {
    await this._sortItems(sortOptions.HighLow)
  }

  async addRandomItemToCart() {
    const itemsCount = await this.itemController.getItemsCount('inventory')
    const randomItem = randomInt(itemsCount)
    const itemsElements = await this.itemController.components.items()
    const randomElement = itemsElements[randomItem]

    const nameElement = await randomElement.$(this.itemLocators.itemNameText)
    const name = await nameElement.innerText()
    const descriptionElement = await randomElement.$(this.itemLocators.itemDescriptionText)
    const description = await descriptionElement.innerText()
    const priceElement = await randomElement.$(this.itemLocators.itemPriceText)
    let price = await priceElement.innerText()
    price = price.replace('$', '')

    const addToCartButton = await randomElement.$(this.locators.addToCartButton)
    await addToCartButton.click()

    return {
      name: name,
      description: description,
      price: price,
    }
  }
}

module.exports = { InventoryController }
