/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { FooterComponents, footerLocators } = require("./components")

/**
 * Class representing the Footer's elements interations
 */
class FooterController {
    /**
     * Create the Footer controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {CartComponents} components - class with elementsHandle of the footer elements
     * @param {Object} locators - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new FooterComponents(this.page)
        this.locators = footerLocators
    }

    /**
     * Validate if "footerContainer" element is visible
     */
    async componentIsVisible() {
        const footerContainerElement = await this.components.footerContainer()
        await footerContainerElement.isVisible()
    }

    /**
     * Get Twitter link
     * @returns href Twitter's URL
     */
    async getTwitterLink() {
        const socialElement = await this.components.twitterLink()
        return await socialElement.getAttribute("href")
    }

    /**
     * Get Facebook link
     * @returns href Facebook's URL
     */
    async getFacebookLink() {
        const socialElement = await this.components.facebookLink()
        return await socialElement.getAttribute("href")
    }

    /**
     * Get LinkedIn link
     * @returns href LinkedIn's URL
     */
    async getLinkedinLink() {
        const socialElement = await this.components.linkedinLink()
        return await socialElement.getAttribute("href")
    }

    /**
     * Get Robot image source
     * @returns image's source URL
     */
    async getRobotImage() {
        const socialElement = await this.components.robotImage()
        return await socialElement.getAttribute("src")
    }

    /**
     * Get copyright text
     * @returns copyright's element text
     */
    async getCopyrightText() {
        const socialElement = await this.components.copyrightText()
        return await socialElement.innerText()
    }
}

module.exports = { FooterController }
