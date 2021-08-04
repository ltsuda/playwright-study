const { TitleHeaderComponents, titleHeaderLocators } = require('./components')

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
}

module.exports = { TitleHeaderController }
