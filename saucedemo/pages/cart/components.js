const cartLocators = {
    cartContainer: ".cart_contents_container",
    continueShoppingButton: "[data-test='continue-shopping']",
    checkoutButton: "[data-test='checkout']",
}

class CartComponents {
    constructor(page) {
        this.page = page
    }

    async cartContainer() {
        return await this.page.$(cartLocators.cartContainer)
    }

    async continueShoppingButton() {
        return await this.page.$(cartLocators.continueShoppingButton)
    }

    async checkoutButton() {
        return await this.page.$(cartLocators.checkoutButton)
    }
}

module.exports = {
    CartComponents,
    cartLocators,
}
