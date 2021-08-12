const titleHeaderLocators = {
    titleHeaderContainer: "header_secondary_container",
    titleText: "title",
    sortDropdown: "[data-test='product_sort_container']",
}

class TitleHeaderComponents {
    constructor(page) {
        this.page = page
    }

    async titleText() {
        return await this.page.$(`${titleHeaderLocators.titleHeaderContainer}` + ">>" + `${titleHeaderLocators.titleText}`)
    }

    async sortDropdown() {
        return await this.page.$(titleHeaderLocators.sortDropdown)
    }
}

module.exports = {
    TitleHeaderComponents,
    titleHeaderLocators,
}
