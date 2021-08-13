/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { TitleHeaderComponents, titleHeaderLocators } = require("./components")

/**
 * Object representing the dropdown select values
 */
const sortOptions = Object.freeze({
    A_Z: "az",
    Z_A: "za",
    LowHigh: "lohi",
    HighLow: "hilo",
})

/**
 * Object representing Title header's HTML selectors
 */
class TitleHeaderController {
    /**
     * Create the TitleHeader controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {TitleHeaderComponents} components - class with elementsHandle of the title header elements
     * @param {Object} locators - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new TitleHeaderComponents(this.page)
        this.locators = titleHeaderLocators
    }

    /**
     * Select a sort order on the dropdown element
     * @param {sortOptions} option - order option to sort items
     * @private
     */
    async _sortItems(option) {
        const sortElement = await this.components.sortDropdown()
        await sortElement.selectOption(option)
    }

    /**
     * Select sort from A to Z option to sort items
     */
    async sortZA() {
        await this._sortItems(sortOptions.Z_A)
    }

    /**
     * Select sort from Z to A option to sort items
     */
    async sortLowHigh() {
        await this._sortItems(sortOptions.LowHigh)
    }

    /**
     * Select sort from High to Low price option to sort items
     */
    async sortHighLow() {
        await this._sortItems(sortOptions.HighLow)
    }
}

module.exports = { TitleHeaderController }
