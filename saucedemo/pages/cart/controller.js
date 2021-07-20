const { InventoryController } = require("../inventory/controller")
const { CartComponents, cartLocators } = require("./components")
const { randomInt } = require("../../utils/utils")

class CartController {
  constructor(page) {
    this.page = page
    this.components = new CartComponents(this.page)
    this.locators = cartLocators
  }

  async navigate() {
    await this.page.goto(
      process.env.SAUCE_CART_URL || "https://www.saucedemo.com/cart.html"
    )
  }

  async continueShopping() {
    const continueButton = await this.components.continueShoppingButton()
    await continueButton.click()
    return new InventoryController(this.page)
  }

  async goToCheckout() {
    const checkoutButton = await this.components.checkoutButton()
    await checkoutButton.click()
  }

  async _getItemsText(elements) {
    const texts = []

    for (const element of elements) {
      texts.push(await element.innerText())
    }
    return texts
  }

  async getCartItemsCount() {
    const itemsElements = await this.components.items()
    return itemsElements.length
  }

  async getItemsName() {
    const nameElements = await this.components.itemsName()
    return await this._getItemsText(nameElements)
  }

  async getItemObjects() {
    const itemsElements = await this.components.items()
    let items = []
    for (const itemElement of itemsElements) {
      const nameElement = await itemElement.$(this.locators.cartItemName)
      const name = await nameElement.innerText()
      const descriptionElement = await itemElement.$(
        this.locators.cartItemDescription
      )
      const description = await descriptionElement.innerText()
      const priceElement = await itemElement.$(this.locators.cartItemPrice)
      let price = await priceElement.innerText()
      price = price.replace("$", "")

      items.push({
        name: name,
        description: description,
        price: price,
      })
    }

    return items
  }

  async removeRandomItemFromCart() {
    const removeFromCartElements = await this.components.removeItemButton()
    const randomElement =
      removeFromCartElements[randomInt(removeFromCartElements.length)]
    await randomElement.click()
  }

  async getTotalPrice() {
    // as the system locks at 1 unit per product, so we can get all prices without
    // having to relate it to any product, just add them to get the total
    const priceElements = await this.components.itemsPrice()
    var prices = await this._getItemsText(priceElements)
    var totalPrice = 0
    prices.forEach((price) => {
      const priceString = price.replace("$", "")
      totalPrice = parseFloat(totalPrice) + parseFloat(priceString)
    })

    return totalPrice.toFixed(2)
  }
}

module.exports = {
  CartController,
  cartLocators,
}
