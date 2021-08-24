/* eslint-disable no-unused-vars */
const { Page, expect } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { OverviewComponents, overviewSelectors } = require("./components")
const { PAGES } = require("../../utils/consts")

/**
 * Class representing the Overview's page interations
 */
class OverviewController {
    /**
     * Create the Overview controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {CartComponents} components - class with Locators of the Overview page
     * @param {Object} selectors - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new OverviewComponents(this.page)
        this.selectors = overviewSelectors
    }

    /**
     * Navigate to the Overview page and wait until network is idle
     */
    async navigate() {
        await this.page.goto(PAGES.OVERVIEW, "networkidle")
    }

    /**
     * Validate if "overviewContainer" element is visible
     */
    async screenIsVisible() {
        const overviewContainerElement = await this.components.overviewContainer()
        await expect(overviewContainerElement).toBeVisible()
    }

    /**
     * Click at the Cancel checkout button
     */
    async cancelCheckout() {
        const cancelCheckoutButton = await this.components.cancelCheckoutButton()
        await cancelCheckoutButton.click()
    }

    /**
     * Click at the Finish button
     */
    async finishCheckout() {
        const finishCheckoutButton = await this.components.finishCheckoutButton()
        await finishCheckoutButton.click()
    }

    /**
     * Get subtotal value
     * @returns {String} subtotal value element text
     */
    async getSubtotal() {
        const subtotalElement = await this.components.subtotalText()
        let subtotal = await subtotalElement.innerText()
        subtotal = parseFloat(subtotal.replace("Item total: $", ""))
        return parseFloat(subtotal.toFixed(2))
    }

    /**
     * Get tax value
     * @returns {String} tax value element text
     */
    async getTax() {
        const taxElement = await this.components.taxText()
        let tax = await taxElement.innerText()
        tax = parseFloat(tax.replace("Tax: $", ""))
        return parseFloat(tax.toFixed(2))
    }

    /**
     * Get total price value
     * @returns {String} total value element text
     */
    async getTotalPrice() {
        const priceElement = await this.components.totalPriceText()
        let total = await priceElement.innerText()
        total = parseFloat(total.replace("Total: $", ""))
        return parseFloat(total.toFixed(2))
    }

    /**
     * Calculate tax value by multiplying the subtotal by 80%
     * @returns {String} calculated tax value
     */
    async calculateTax() {
        const subTotal = await this.getSubtotal()
        const tax = (subTotal * 0.08).toFixed(2)
        return parseFloat(tax)
    }

    /**
     * Calculate total value by adding up the subtotal and the calculated tax value
     * @returns {String} calculated total value
     */
    async calculateTotal() {
        const subTotal = await this.getSubtotal()
        const tax = await this.calculateTax()
        const total = subTotal + tax
        return total
    }
}

module.exports = {
    OverviewController,
    overviewSelectors,
}
