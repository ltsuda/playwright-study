const { InventoryComponents, inventoryLocators } = require("./components")
const { randomInt } = require("../../utils/utils")

const sortOptions = Object.freeze({
  A_Z: "az",
  Z_A: "za",
  LowHigh: "lohi",
  HighLow: "hilo",
})

class InventoryController {
  constructor(page) {
    this.page = page
    this.components = new InventoryComponents(this.page)
    this.locators = inventoryLocators
    this.sortOptions = sortOptions
  }

  async navigate() {
    await this.page.goto(
      process.env.SAUCE_INVENTORY_URL ||
        "https://www.saucedemo.com/inventory.html"
    )
  }

  async _sortItems(option) {
    const sortElement = await this.components.sortItems()
    await sortElement.selectOption(option)
  }

  async sortAZ() {
    await this._sortItems(this.sortOptions.A_Z)
  }

  async sortZA() {
    await this._sortItems(this.sortOptions.Z_A)
  }

  async sortLowHigh() {
    await this._sortItems(this.sortOptions.LowHigh)
  }

  async sortHighLow() {
    await this._sortItems(this.sortOptions.HighLow)
  }

  async getItemsCount() {
    const itemsElements = await this.components.items()
    return itemsElements.length
  }

  async _getItemsTextByIndex(elements, index) {
    const texts = []

    for (const element of elements) {
      texts.push(await element.innerText())
    }
    if (index == "all") {
      return texts
    } else {
      return texts[index]
    }
  }

  async getItemsNamesByIndex(index) {
    const nameElements = await this.components.itemsName()
    return await this._getItemsTextByIndex(nameElements, index)
  }

  async getItemsPricesByIndex(index) {
    const priceElements = await this.components.itemsPrice()
    var prices = await this._getItemsTextByIndex(priceElements, index)
    var priceString = []

    if (index > 0 || index == "all") {
      prices.forEach((price) => {
        priceString.push(price.replace("$", ""))
      })
    }

    if (index == "all") {
      return priceString
    } else {
      return priceString[index]
    }
  }

  async addRandomItemToCart() {
    const itemsCount = await this.getItemsCount()
    const randomItem = randomInt(itemsCount)
    const itemsElements = await this.components.items()
    const randomElement = itemsElements[randomItem]

    const nameElement = await randomElement.$(this.locators.itemsName)
    const name = await nameElement.innerText()
    const descriptionElement = await randomElement.$(
      this.locators.itemsDescription
    )
    const description = await descriptionElement.innerText()
    const priceElement = await randomElement.$(this.locators.itemsPrice)
    let price = await priceElement.innerText()
    price = price.replace("$", "")

    const addToCartButton = await randomElement.$(this.locators.addToCart)
    await addToCartButton.click()

    return {
      name: name,
      description: description,
      price: price,
    }
  }

  async removeRandomItemFromCart() {
    const removeFromCartElements = await this.components.removeFromCartButtons()
    const randomElement =
      removeFromCartElements[randomInt(removeFromCartElements.length)]
    await randomElement.click()
  }

  async getCartBadge() {
    const badgeElement = await this.components.cartBadge()
    return await badgeElement.innerText()
  }

  async goToCart() {
    const cartButtonElement = await this.components.cart()
    await cartButtonElement.click()
  }
}

module.exports = { InventoryController }
