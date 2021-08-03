const {
  SecondaryHeaderComponents,
  secondaryHeaderLocators,
} = require("./components")

class SecondaryHeaderController {
  constructor(page) {
    this.page = page
    this.components = new SecondaryHeaderComponents(this.page)
    this.locators = secondaryHeaderLocators
  }

  async getTitleText() {
    const titleElement = await this.components.titleText()
    return await titleElement.innerText()
  }
}

module.exports = { SecondaryHeaderController }
