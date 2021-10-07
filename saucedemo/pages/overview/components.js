/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Overview's HTML selectors
 */
const overviewSelectors = {
    overviewContainer: ".checkout_summary_container",
    cancelCheckoutButton: "[data-test='cancel']",
    finishCheckoutButton: "[data-test='finish']",
    summaryInfoContainer: ".summary_info",
    paymentInfoText: "text=/saucecard #31337/i",
    shippingInfoText: "text=/FREE PONY EXPRESS DELIVERY!/i",
    subtotalText: ".summary_subtotal_label",
    taxText: ".summary_tax_label",
    totalPriceText: ".summary_total_label",
}

/**
 * Class representing playwright's Locators from /checkout-two.html page\
 * See {@link https://playwright.dev/docs/api/class-locator}
 */
class OverviewComponents {
    /**
     * Create the Overview Locators
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the overview's container Locator
     * @returns {Locator} Locator for 'overviewContainer' selector
     */
     overviewContainer() {
        return this.page.locator(overviewSelectors.overviewContainer)
    }

    /**
     * Get the payment information text Locator
     * @returns {String} payment card element text selector
     */
     paymentInfoText() {
        return this.page.locator(
            `${overviewSelectors.summaryInfoContainer}` + ">>" + `${overviewSelectors.paymentInfoText}`
        )
    }

    /**
     * Get the shipment information text Locator
     * @returns {String} shipment element text
     */
     shippingInfoText() {
        return this.page.locator(
            `${overviewSelectors.summaryInfoContainer}` + ">>" + `${overviewSelectors.shippingInfoText}`
        )
    }

    /**
     * Get the subtotal text Locator
     * @returns {String} subtotal element text
     */
     subtotalText() {
        return this.page.locator(
            `${overviewSelectors.summaryInfoContainer}` + ">>" + `${overviewSelectors.subtotalText}`
        )
    }

    /**
     * Get the tax text Locator
     * @returns {String} tax element text
     */
     taxText() {
        return this.page.locator(`${overviewSelectors.summaryInfoContainer}` + ">>" + `${overviewSelectors.taxText}`)
    }

    /**
     * Get the total price text Locator
     * @returns {String} total price element text
     */
     totalPriceText() {
        return this.page.locator(
            `${overviewSelectors.summaryInfoContainer}` + ">>" + `${overviewSelectors.totalPriceText}`
        )
    }

    /**
     * Get the cancel checkout button Locator
     * @returns {Locator} Locator for 'cancelCheckoutButton' selector
     */
     cancelCheckoutButton() {
        return this.page.locator(overviewSelectors.cancelCheckoutButton)
    }

    /**
     * Get the finish purchase button Locator
     * @returns {Locator} Locator for 'finishCheckoutButton' selector
     */
     finishCheckoutButton() {
        return this.page.locator(overviewSelectors.finishCheckoutButton)
    }
}

module.exports = {
    OverviewComponents,
    overviewSelectors,
}
