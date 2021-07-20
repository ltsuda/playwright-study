const { OverviewComponents, overviewLocators } = require("./components")
const { randomInt } = require("../../utils/utils")

class OverviewController {
  constructor(page) {
    this.page = page
    this.components = new OverviewComponents(this.page)
    this.locators = overviewLocators
  }

  async cancelCheckout() {
    const cancelCheckoutButton = await this.components.cancelCheckoutButton()
    await cancelCheckoutButton.click()
  }

  async finishCheckout() {
    const finishCheckoutButton = await this.components.finishCheckoutButton()
    await finishCheckoutButton.click()
  }

  async _getItemsText(elements) {
    const texts = []

    for (const element of elements) {
      texts.push(await element.innerText())
    }
    return texts
  }

  async getCheckoutItems() {
    const itemsElements = await this.components.items()
    return itemsElements.length
  }

  async getItemsName() {
    const nameElements = await this.components.itemsName()
    return await this._getItemsText(nameElements)
  }

  async getPaymentText() {
    const paymentElement = await this.components.paymentInfoText()
    return await paymentElement.innerText()
  }

  async getShippingText() {
    const shippingElement = await this.components.shippingInfoText()
    return await shippingElement.innerText()
  }

  async getItemObjects() {
    const itemsElements = await this.components.items()
    let items = []
    for (const itemElement of itemsElements) {
      const nameElement = await itemElement.$(this.locators.overviewItemName)
      const name = await nameElement.innerText()
      const descriptionElement = await itemElement.$(
        this.locators.overviewItemDescription
      )
      const description = await descriptionElement.innerText()
      const priceElement = await itemElement.$(this.locators.overviewItemPrice)
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

  async getSubtotal() {
    const subtotalElement = await this.components.subtotalText()
    let subtotal = await subtotalElement.innerText()
    subtotal = parseFloat(subtotal.replace("Item total: $", ""))
    return parseFloat(subtotal.toFixed(2))
  }

  async getTax() {
    const taxElement = await this.components.taxText()
    let tax = await taxElement.innerText()
    tax = parseFloat(tax.replace("Tax: $", ""))
    return parseFloat(tax.toFixed(2))
  }

  async getTotalPrice() {
    const priceElement = await this.components.totalPriceText()
    let total = await priceElement.innerText()
    total = parseFloat(total.replace("Total: $", ""))
    return parseFloat(total.toFixed(2))
  }

  async calculateTax() {
    const subTotal = await this.getSubtotal()
    const tax = (subTotal * 0.08).toFixed(2)
    return parseFloat(tax)
  }

  async calculateTotal() {
    const subTotal = await this.getSubtotal()
    const tax = await this.calculateTax()
    const total = subTotal + tax
    return total
  }
}

module.exports = {
  OverviewController,
  overviewLocators,
}
