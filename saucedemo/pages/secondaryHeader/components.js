const secondaryHeaderLocators = {
  secondaryHeaderContainer: 'header_secondary_container',
  titleText: 'title',
  sortDropdown: '[data-test="product_sort_container"]',
}

class SecondaryHeaderComponents {
  constructor(page) {
    this.page = page
  }

  async titleText() {
    return await this.page.$(
      `${secondaryHeaderLocators.secondaryHeaderContainer}` + '>>' + `${secondaryHeaderLocators.titleText}`
    )
  }

  async sortDropdown() {
    return await this.page.$(secondaryHeaderLocators.sortDropdown)
  }
}

module.exports = {
  SecondaryHeaderComponents,
  secondaryHeaderLocators,
}
