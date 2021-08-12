const completedLocators = {
    completedContainer: "[class='checkout_complete_container']",
    completedHeaderText: "[class='complete-header']",
    completedText: "[class='complete-text']",
    completedImage: "[class='pony_express']",
    completedBackButton: "[data-test='back-to-products']",
}

class CompletedComponents {
    constructor(page) {
        this.page = page
    }

    async completedContainer() {
        return await this.page.$(completedLocators.completedContainer)
    }

    async completedHeaderText() {
        return await this.page.$(
            `${completedLocators.completedContainer}` + ">>" + `${completedLocators.completedHeaderText}`
        )
    }

    async completedText() {
        return await this.page.$(`${completedLocators.completedContainer}` + ">>" + `${completedLocators.completedText}`)
    }

    async completedImage() {
        return await this.page.$(`${completedLocators.completedContainer}` + ">>" + `${completedLocators.completedImage}`)
    }

    async completedBackButton() {
        return await this.page.$(
            `${completedLocators.completedContainer}` + ">>" + `${completedLocators.completedBackButton}`
        )
    }
}

module.exports = {
    CompletedComponents,
    completedLocators,
}
