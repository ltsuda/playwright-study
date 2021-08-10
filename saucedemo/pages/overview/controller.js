const { OverviewComponents, overviewLocators } = require('./components')
const { PAGES } = require('../../utils/consts')

class OverviewController {
  constructor(page) {
    this.page = page
    this.components = new OverviewComponents(this.page)
    this.locators = overviewLocators
  }

  async navigate() {
    await this.page.goto(PAGES.OVERVIEW, 'networkidle')
  }

  async screenIsVisible() {
    const overviewContainerElement = await this.components.overviewContainer()
    await overviewContainerElement.isVisible()
  }

  async cancelCheckout() {
    const cancelCheckoutButton = await this.components.cancelCheckoutButton()
    await cancelCheckoutButton.click()
  }

  async finishCheckout() {
    const finishCheckoutButton = await this.components.finishCheckoutButton()
    await finishCheckoutButton.click()
  }

  async getPaymentText() {
    const paymentElement = await this.components.paymentInfoText()
    return await paymentElement.innerText()
  }

  async getShippingText() {
    const shippingElement = await this.components.shippingInfoText()
    return await shippingElement.innerText()
  }
  async getSubtotal() {
    const subtotalElement = await this.components.subtotalText()
    let subtotal = await subtotalElement.innerText()
    subtotal = parseFloat(subtotal.replace('Item total: $', ''))
    return parseFloat(subtotal.toFixed(2))
  }

  async getTax() {
    const taxElement = await this.components.taxText()
    let tax = await taxElement.innerText()
    tax = parseFloat(tax.replace('Tax: $', ''))
    return parseFloat(tax.toFixed(2))
  }

  async getTotalPrice() {
    const priceElement = await this.components.totalPriceText()
    let total = await priceElement.innerText()
    total = parseFloat(total.replace('Total: $', ''))
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
