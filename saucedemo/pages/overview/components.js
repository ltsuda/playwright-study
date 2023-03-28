/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Overview's HTML selectors
 */
const overviewSelectors = {
    overviewContainer: "data-test=checkout-summary-container",
    cancelCheckoutButton: "data-test=button-cancel",
    finishCheckoutButton: "data-test=button-finish",
    paymentInfoText: "data-test=value-payment-information",
    shippingInfoText: "data-test=value-shipping-information",
    subtotalText: "data-test=value-subtotal",
    taxText: "data-test=label-tax",
    totalPriceText: "data-test=label-total",
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
        return this.page.locator(overviewSelectors.paymentInfoText)
    }

    /**
     * Get the shipment information text Locator
     * @returns {String} shipment element text
     */
    shippingInfoText() {
        return this.page.locator(overviewSelectors.shippingInfoText)
    }

    /**
     * Get the subtotal text Locator
     * @returns {String} subtotal element text
     */
    subtotalText() {
        return this.page.locator(overviewSelectors.subtotalText)
    }

    /**
     * Get the tax text Locator
     * @returns {String} tax element text
     */
    taxText() {
        return this.page.locator(overviewSelectors.taxText)
    }

    /**
     * Get the total price text Locator
     * @returns {String} total price element text
     */
    totalPriceText() {
        return this.page.locator(overviewSelectors.totalPriceText)
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
