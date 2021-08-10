const overviewLocators = {
  overviewContainer: '.checkout_summary_container',
  cancelCheckoutButton: '[data-test="cancel"]',
  finishCheckoutButton: '[data-test="finish"]',
  summaryInfoContainer: '[class="summary_info"]',
  paymentInfoText: 'text=/saucecard #31337/i',
  shippingInfoText: 'text=/FREE PONY EXPRESS DELIVERY!/i',
  subtotalText: '[class="summary_subtotal_label"]',
  taxText: '[class="summary_tax_label"]',
  totalPriceText: '[class="summary_total_label"]',
}

class OverviewComponents {
  constructor(page) {
    this.page = page
  }

  async overviewContainer() {
    return await this.page.$(overviewLocators.overviewContainer)
  }

  async paymentInfoText() {
    return await this.page.$(`${overviewLocators.summaryInfoContainer}` + '>>' + `${overviewLocators.paymentInfoText}`)
  }

  async shippingInfoText() {
    return await this.page.$(`${overviewLocators.summaryInfoContainer}` + '>>' + `${overviewLocators.shippingInfoText}`)
  }

  async subtotalText() {
    return await this.page.$(`${overviewLocators.summaryInfoContainer}` + '>>' + `${overviewLocators.subtotalText}`)
  }

  async taxText() {
    return await this.page.$(`${overviewLocators.summaryInfoContainer}` + '>>' + `${overviewLocators.taxText}`)
  }

  async totalPriceText() {
    return await this.page.$(`${overviewLocators.summaryInfoContainer}` + '>>' + `${overviewLocators.totalPriceText}`)
  }

  async cancelCheckoutButton() {
    return await this.page.$(overviewLocators.cancelCheckoutButton)
  }

  async finishCheckoutButton() {
    return await this.page.$(overviewLocators.finishCheckoutButton)
  }
}

module.exports = {
  OverviewComponents,
  overviewLocators,
}
