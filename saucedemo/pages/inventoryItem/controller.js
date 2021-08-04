const { InventoryItemComponents, inventoryItemLocators } = require('./components')
const { randomInt } = require('../../utils/utils')

class InventoryItemController {
  constructor(page) {
    this.page = page
    this.components = new InventoryItemComponents(this.page)
    this.locators = inventoryItemLocators
  }

  async getItemsCount(fromPage) {
    const itemsElements = await this.components.items(fromPage)
    return itemsElements.length
  }

  async _getItemsTextByIndex(elements, index) {
    const texts = []

    for (const element of elements) {
      texts.push(await element.innerText())
    }
    if (index == 'all') {
      return texts
    } else {
      return texts[index]
    }
  }

  async getItemsNameTextByIndex(index) {
    const nameElements = await this.components.itemsNameText()
    return await this._getItemsTextByIndex(nameElements, index)
  }

  async getItemsPriceTextByIndex(index) {
    const priceElements = await this.components.itemsPriceText()
    var prices = await this._getItemsTextByIndex(priceElements, index)
    var priceString = []

    if (index > 0 || index == 'all') {
      prices.forEach((price) => {
        priceString.push(price.replace('$', ''))
      })
    }

    return index == 'all' ? priceString : priceString[index]
  }

  async getItemsObject(fromPage = 'inventory') {
    const itemsElements = await this.components.items(fromPage)
    let items = []
    for (const itemElement of itemsElements) {
      const nameElement = await itemElement.$(this.locators.itemNameText)
      const name = await nameElement.innerText()
      const descriptionElement = await itemElement.$(this.locators.itemDescriptionText)
      const description = await descriptionElement.innerText()
      const priceElement = await itemElement.$(this.locators.itemPriceText)
      let price = await priceElement.innerText()
      price = price.replace('$', '')

      items.push({
        name: name,
        description: description,
        price: price,
      })
    }

    return items
  }

  async removeRandomItemFromCart() {
    const removeFromElements = await this.components.removeItemsButton()
    const randomElement = removeFromElements[randomInt(removeFromElements.length)]
    await randomElement.click()
  }

  async getTotalPrice() {
    // as the system locks at 1 unit per product, so we can get all prices without
    // having to relate it to any product, just add them to get the total
    const priceElements = await this.components.itemsPrice()
    var prices = await this._getItemsTextByIndex(priceElements, 'all')
    var totalPrice = 0
    prices.forEach((price) => {
      const priceString = price.replace('$', '')
      totalPrice = parseFloat(totalPrice) + parseFloat(priceString)
    })

    return totalPrice.toFixed(2)
  }
}

module.exports = { InventoryItemController }
