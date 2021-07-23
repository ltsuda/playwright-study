const { FooterComponents, footerLocators } = require("./components")

class FooterController {
  constructor(page) {
    this.page = page
    this.components = new FooterComponents(this.page)
    this.locators = footerLocators
  }

  async getTwitterLink() {
    const socialElement = await this.components.twitterLink()
    return await socialElement.getAttribute("href")
  }

  async getFacebookLink() {
    const socialElement = await this.components.facebookLink()
    return await socialElement.getAttribute("href")
  }

  async getLinkedinLink() {
    const socialElement = await this.components.linkedinLink()
    return await socialElement.getAttribute("href")
  }

  async getRobotImage() {
    const socialElement = await this.components.robotImage()
    return await socialElement.getAttribute("src")
  }

  async getCopyrightText() {
    const socialElement = await this.components.copyrightText()
    return await socialElement.innerText()
  }
}

module.export = { FooterController }
