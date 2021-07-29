const overviewLocators = {
  cancelCheckout: "[data-test='cancel']",
  finishCheckout: "[data-test='finish']",
  summaryInfo: "[class='summary_info']",
  paymentInfo: "text=/saucecard #31337/i",
  shippingInfo: "text=/FREE PONY EXPRESS DELIVERY!/i",
  subtotal: "[class='summary_subtotal_label']",
  tax: "[class='summary_tax_label']",
  totalPrice: "[class='summary_total_label']",
}

class OverviewComponents {
  constructor(page) {
    this.page = page
  }

  async paymentInfoText() {
    return await this.page.$(
      `${overviewLocators.summaryInfo}` +
        ">>" +
        `${overviewLocators.paymentInfo}`
    )
  }

  async shippingInfoText() {
    return await this.page.$(
      `${overviewLocators.summaryInfo}` +
        ">>" +
        `${overviewLocators.shippingInfo}`
    )
  }

  async subtotalText() {
    return await this.page.$(
      `${overviewLocators.summaryInfo}` + ">>" + `${overviewLocators.subtotal}`
    )
  }

  async taxText() {
    return await this.page.$(
      `${overviewLocators.summaryInfo}` + ">>" + `${overviewLocators.tax}`
    )
  }

  async totalPriceText() {
    return await this.page.$(
      `${overviewLocators.summaryInfo}` +
        ">>" +
        `${overviewLocators.totalPrice}`
    )
  }

  async cancelCheckoutButton() {
    return await this.page.$(overviewLocators.cancelCheckout)
  }

  async finishCheckoutButton() {
    return await this.page.$(overviewLocators.finishCheckout)
  }
}

module.exports = {
  OverviewComponents,
  overviewLocators,
}
