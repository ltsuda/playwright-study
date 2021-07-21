const completedLocators = {
  completedContainer: "[class='checkout_complete_container']",
  completedHeader: "[class='complete-header']",
  completedText: "[class='complete-text']",
  completedImage: "[class='pony_express']",
  completedBackButton: "[data-test='back-to-products']",
}

class CompletedComponents {
  constructor(page) {
    this.page = page
  }

  async completedHeader() {
    return await this.page.$(
      `${completedLocators.completedContainer}` +
        ">>" +
        `${completedLocators.completedHeader}`
    )
  }

  async completedText() {
    return await this.page.$(
      `${completedLocators.completedContainer}` +
        ">>" +
        `${completedLocators.completedText}`
    )
  }

  async completedImage() {
    return await this.page.$(
      `${completedLocators.completedContainer}` +
        ">>" +
        `${completedLocators.completedImage}`
    )
  }

  async completedBackButton() {
    return await this.page.$(
      `${completedLocators.completedContainer}` +
        ">>" +
        `${completedLocators.completedBackButton}`
    )
  }
}

module.exports = {
  CompletedComponents,
  completedLocators,
}
