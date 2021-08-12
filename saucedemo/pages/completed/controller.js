const { CompletedComponents, completedLocators } = require("./components")
const { PAGES } = require("../../utils/consts")

class CompletedController {
    constructor(page) {
        this.page = page
        this.components = new CompletedComponents(this.page)
        this.locators = completedLocators
    }

    async navigate() {
        await this.page.goto(PAGES.COMPLETED, "networkidle")
    }

    async screenIsVisible() {
        const completedContainerElement = await this.components.completedContainer()
        await completedContainerElement.isVisible()
    }

    async navigateBackHome() {
        const backHomeButton = await this.components.completedBackButton()
        await backHomeButton.click()
    }

    async getHeaderText() {
        const headerElement = await this.components.completedHeaderText()
        return await headerElement.innerText()
    }

    async getCompletedText() {
        const completedElement = await this.components.completedText()
        return await completedElement.innerText()
    }

    async getCompletedImage() {
        const imageElement = await this.components.completedImage()
        return await imageElement.getAttribute("src")
    }
}

module.exports = {
    CompletedController,
    completedLocators,
}
