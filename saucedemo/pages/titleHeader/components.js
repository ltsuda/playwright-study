/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const titleHeaderLocators = {
    sortDropdown: "[data-test='product_sort_container']",
}

/**
 * Object representing Title header's HTML selectors
 */
class TitleHeaderComponents {
    /**
     * Create the Title header ElementsHandle
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the sort dropdown ElementHandle
     * @returns {ElementHandle} ElementHandle for 'sortDropdown' locator
     */
    async sortDropdown() {
        return await this.page.$(titleHeaderLocators.sortDropdown)
    }
}

module.exports = {
    TitleHeaderComponents,
    titleHeaderLocators,
}
