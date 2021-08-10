const { InventoryItemComponents, inventoryItemLocators } = require('./components')
const { randomInt } = require('../../utils/utils')

class InventoryItemController {
  constructor(page) {
    this.page = page
    this.components = new InventoryItemComponents(this.page)
    this.locators = inventoryItemLocators
  }

  async screenIsVisible() {
    const itemDetailContainerElement = await this.components.itemDetailContainer()
    await itemDetailContainerElement.isVisible()
  }

  async screenItemIsVisible() {
    const cartItemContainerElement = await this.components.cartItemContainer()
    await cartItemContainerElement.isVisible()
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

  async getItemsNameTextByIndex(index, fromPage) {
    const nameElements = await this.components.itemsNameText(fromPage)
    return await this._getItemsTextByIndex(nameElements, index)
  }

  async getItemsPriceTextByIndex(index, fromPage) {
    const priceElements = await this.components.itemsPriceText(fromPage)
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
      const namelocator =
        fromPage == 'details' ? this.locators.itemNameText.replace('item', 'details') : this.locators.itemNameText
      const nameElement = await itemElement.$(namelocator)
      const name = await nameElement.innerText()
      const descriptionLocator =
        fromPage == 'details'
          ? this.locators.itemDescriptionText.replace('item', 'details')
          : this.locators.itemDescriptionText
      const descriptionElement = await itemElement.$(descriptionLocator)
      const description = await descriptionElement.innerText()
      const pricelocator =
        fromPage == 'details' ? this.locators.itemPriceText.replace('item', 'details') : this.locators.itemPriceText
      const priceElement = await itemElement.$(pricelocator)
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

  async removeRandomItemFromCart(fromPage) {
    const removeFromElements = await this.components.removeItemsButton(fromPage)
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

  async addRandomItemToCart() {
    const itemsCount = await this.getItemsCount('inventory')
    const randomItem = randomInt(itemsCount)
    const itemsElements = await this.components.items()
    const randomElement = itemsElements[randomItem]

    const nameElement = await randomElement.$(this.locators.itemNameText)
    const name = await nameElement.innerText()
    const descriptionElement = await randomElement.$(this.locators.itemDescriptionText)
    const description = await descriptionElement.innerText()
    const priceElement = await randomElement.$(this.locators.itemPriceText)
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

  async backToProducts() {
    const backToProductsButton = await this.components.backToProductsButton()
    await backToProductsButton.click()
  }

  async addToCart(fromPage = 'details') {
    const addToCartButton = await this.components.addToCartButton(fromPage)
    await addToCartButton.click()
  }

  async removeFromCart(fromPage = 'details') {
    const removeFromElements = await this.components.removeItemsButton(fromPage)
    await removeFromElements[0].click()
  }
}

module.exports = { InventoryItemController }
