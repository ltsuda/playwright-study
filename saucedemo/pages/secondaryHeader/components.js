const secondaryHeaderLocators = {
  secondaryHeader: "header_secondary_container",
  pageTitle: "title",
  sortItemsDropdown: "[data-test='product_sort_container']",
}

class SecondaryHeaderComponents {
  constructor(page) {
    this.page = page
  }

  async title() {
    return await this.page.$(
      `${secondaryHeaderLocators.secondaryHeader}` +
        ">>" +
        `${secondaryHeaderLocators.pageTitle}`
    )
  }

  async sortItemsDropdown() {
    return await this.page.$(secondaryHeaderLocators.sortItemsDropdown)
  }
}

module.exports = {
  SecondaryHeaderComponents,
  secondaryHeaderLocators,
}
