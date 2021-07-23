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

  async getTitle() {
    const titleElement = await this.components.title()
    return await titleElement.innerText()
  }
}

module.exports = { SecondaryHeaderController }
