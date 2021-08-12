const { TitleHeaderComponents, titleHeaderLocators } = require("./components")

const sortOptions = Object.freeze({
    A_Z: "az",
    Z_A: "za",
    LowHigh: "lohi",
    HighLow: "hilo",
})

class TitleHeaderController {
    constructor(page) {
        this.page = page
        this.components = new TitleHeaderComponents(this.page)
        this.locators = titleHeaderLocators
    }

    async getTitleText() {
        const titleElement = await this.components.titleText()
        return await titleElement.innerText()
    }

    async _sortItems(option) {
        const sortElement = await this.components.sortDropdown()
        await sortElement.selectOption(option)
    }

    async sortZA() {
        await this._sortItems(sortOptions.Z_A)
    }

    async sortLowHigh() {
        await this._sortItems(sortOptions.LowHigh)
    }

    async sortHighLow() {
        await this._sortItems(sortOptions.HighLow)
    }
}

module.exports = { TitleHeaderController }
