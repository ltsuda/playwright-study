/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { TitleHeaderComponents, titleHeaderSelectors } = require("./components")

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
 * Class representing the Title header element's interations
 */
class TitleHeaderController {
    /**
     * Create the TitleHeader controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {TitleHeaderComponents} components - class with Locators of the title header elements
     * @param {Object} selectors - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new TitleHeaderComponents(this.page)
        this.selectors = titleHeaderSelectors
    }

    /**
     * Select a sort order on the dropdown element
     * @param {sortOptions} option - order option to sort items
     * @private
     */
    async _sortItems(option) {
        const sortSelector = this.components.sortDropdown()
        await sortSelector.selectOption(option)
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
