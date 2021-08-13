/* eslint-disable no-unused-vars */
const { Page, ElementHandle } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Overview's HTML selectors
 */
const overviewLocators = {
    overviewContainer: ".checkout_summary_container",
    cancelCheckoutButton: "[data-test='cancel']",
    finishCheckoutButton: "[data-test='finish']",
    summaryInfoContainer: "[class='summary_info']",
    paymentInfoText: "text=/saucecard #31337/i",
    shippingInfoText: "text=/FREE PONY EXPRESS DELIVERY!/i",
    subtotalText: "[class='summary_subtotal_label']",
    taxText: "[class='summary_tax_label']",
    totalPriceText: "[class='summary_total_label']",
}

/**
 * Class representing playwright's ElementHandles from /checkout-two.html page\
 * See {@link https://playwright.dev/docs/api/class-elementhandle}
 */
class OverviewComponents {
    /**
     * Create the Overview ElementsHandle
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the overview's container ElementHandle
     * @returns {ElementHandle} ElementHandle for 'overviewContainer' locator
     */
    async overviewContainer() {
        return await this.page.$(overviewLocators.overviewContainer)
    }

    /**
     * Get the payment information text ElementHandle
     * @returns {String} payment card element text
     */
    async paymentInfoText() {
        return await this.page.$(
            `${overviewLocators.summaryInfoContainer}` + ">>" + `${overviewLocators.paymentInfoText}`
        )
    }

    /**
     * Get the shipment information text ElementHandle
     * @returns {String} shipment element text
     */
    async shippingInfoText() {
        return await this.page.$(
            `${overviewLocators.summaryInfoContainer}` + ">>" + `${overviewLocators.shippingInfoText}`
        )
    }

    /**
     * Get the subtotal text ElementHandle
     * @returns {String} subtotal element text
     */
    async subtotalText() {
        return await this.page.$(`${overviewLocators.summaryInfoContainer}` + ">>" + `${overviewLocators.subtotalText}`)
    }

    /**
     * Get the tax text ElementHandle
     * @returns {String} tax element text
     */
    async taxText() {
        return await this.page.$(`${overviewLocators.summaryInfoContainer}` + ">>" + `${overviewLocators.taxText}`)
    }

    /**
     * Get the total price text ElementHandle
     * @returns {String} total price element text
     */
    async totalPriceText() {
        return await this.page.$(
            `${overviewLocators.summaryInfoContainer}` + ">>" + `${overviewLocators.totalPriceText}`
        )
    }

    /**
     * Get the cancel checkout button ElementHandle
     * @returns {ElementHandle} ElementHandle for 'cancelCheckoutButton' locator
     */
    async cancelCheckoutButton() {
        return await this.page.$(overviewLocators.cancelCheckoutButton)
    }

    /**
     * Get the finish purchase button ElementHandle
     * @returns {ElementHandle} ElementHandle for 'finishCheckoutButton' locator
     */
    async finishCheckoutButton() {
        return await this.page.$(overviewLocators.finishCheckoutButton)
    }
}

module.exports = {
    OverviewComponents,
    overviewLocators,
}
