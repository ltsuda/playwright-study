/* eslint-disable no-unused-vars */
const { Page, ElementHandle } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Footer's HTML selectors
 */
const footerLocators = {
    footerContainer: ".footer",
    twitterSocialLink: ".footer >> .social_twitter > a",
    facebookSocialLink: ".footer >> .social_facebook > a",
    linkdinSocialLink: ".footer >> .social_linkedin > a",
    copyrightText: ".footer >> .footer_copy",
    footerImage: ".footer >> .footer_robot",
}

/**
 * Class representing playwright's ElementHandles for the footer elements\
 * See {@link https://playwright.dev/docs/api/class-elementhandle}
 */
class FooterComponents {
    /**
     * Create the Footer ElementsHandle
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the footer's container ElementHandle
     * @returns {ElementHandle} ElementHandle for 'footerContainer' locator
     */
    async footerContainer() {
        return await this.page.$(footerLocators.footerContainer)
    }

    /**
     * Get the twitter link ElementHandle
     * @returns {ElementHandle} ElementHandle for 'twitterSocialLink' locator
     */
    async twitterLink() {
        return await this.page.$(footerLocators.twitterSocialLink)
    }

    /**
     * Get the facebook link ElementHandle
     * @returns {ElementHandle} ElementHandle for 'facebookSocialLink' locator
     */
    async facebookLink() {
        return await this.page.$(footerLocators.facebookSocialLink)
    }

    /**
     * Get the linkedin link ElementHandle
     * @returns {ElementHandle} ElementHandle for 'linkdinSocialLink' locator
     */
    async linkedinLink() {
        return await this.page.$(footerLocators.linkdinSocialLink)
    }

    /**
     * Get the copyright text ElementHandle
     * @returns {ElementHandle} ElementHandle for 'copyrightText' locator
     */
    async copyrightText() {
        return await this.page.$(footerLocators.copyrightText)
    }

    /**
     * Get the robot image ElementHandle
     * @returns {ElementHandle} ElementHandle for 'footerImage' locator
     */
    async robotImage() {
        return await this.page.$(footerLocators.footerImage)
    }
}

module.exports = {
    FooterComponents,
    footerLocators,
}
