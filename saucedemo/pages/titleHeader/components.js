/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing the Title's HTML selectors
 */
const titleHeaderSelectors = {
    sortDropdown: "data-test=select-sort-items",
}

/**
 * Class representing playwright's Locators for the title header elements\
 * See {@link https://playwright.dev/docs/api/class-locator}
 */
class TitleHeaderComponents {
    /**
     * Create the Title header Locators
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the sort dropdown Locator
     * @returns {Locator} Locator for 'sortDropdown' data-test selector
     */
    sortDropdown() {
        return this.page.locator(titleHeaderSelectors.sortDropdown)
    }
}

module.exports = {
    TitleHeaderComponents,
    titleHeaderSelectors,
}
