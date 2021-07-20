const overviewLocators = {
  overviewItem: "[class='cart_item']",
  overviewItemQty: "[class='cart_quantity']",
  overviewItemName: "[class='inventory_item_name']",
  overviewItemDescription: "[class='inventory_item_desc']",
  overviewItemPrice: "[class='inventory_item_price']",
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

  async items() {
    return await this.page.$$(overviewLocators.overviewItem)
  }

  async itemsPrice() {
    return await this.page.$$(
      `${overviewLocators.overviewItem}` +
        ">>" +
        `${overviewLocators.overviewItemPrice}`
    )
  }

  async itemsName() {
    return await this.page.$$(
      `${overviewLocators.overviewItem}` +
        ">>" +
        `${overviewLocators.overviewItemName}`
    )
  }

  async itemsDescription() {
    return await this.page.$$(
      `${overviewLocators.overviewItem}` +
        ">>" +
        `${overviewLocators.overviewItemDescription}`
    )
  }

  async itemsQuantity() {
    return await this.page.$$(
      `${overviewLocators.overviewItem}` +
        ">>" +
        `${overviewLocators.overviewItemQty}`
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
