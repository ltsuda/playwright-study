/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Footer's HTML selectors
 */
const footerSelectors = {
    footerContainer: ".footer",
    twitterSocialLink: ".footer >> .social_twitter > a",
    facebookSocialLink: ".footer >> .social_facebook > a",
    linkdinSocialLink: ".footer >> .social_linkedin > a",
    copyrightText: ".footer >> .footer_copy",
    footerImage: ".footer >> .footer_robot",
}

/**
 * Class representing playwright's Locators for the footer elements\
 * See {@link https://playwright.dev/docs/api/class-locator}
 */
class FooterComponents {
    /**
     * Create the Footer Locators
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the footer's container Locator
     * @returns {Locator} Locator for 'footerContainer' selector
     */
    async footerContainer() {
        return await this.page.locator(footerSelectors.footerContainer)
    }

    /**
     * Get the twitter link Locator
     * @returns {Locator} Locator for 'twitterSocialLink' selector
     */
    async twitterLink() {
        return await this.page.locator(footerSelectors.twitterSocialLink)
    }

    /**
     * Get the facebook link Locator
     * @returns {Locator} Locator for 'facebookSocialLink' selector
     */
    async facebookLink() {
        return await this.page.locator(footerSelectors.facebookSocialLink)
    }

    /**
     * Get the linkedin link Locator
     * @returns {Locator} Locator for 'linkdinSocialLink' selector
     */
    async linkedinLink() {
        return await this.page.locator(footerSelectors.linkdinSocialLink)
    }

    /**
     * Get the copyright text Locator
     * @returns {Locator} Locator for 'copyrightText' selector
     */
    async copyrightText() {
        return await this.page.locator(footerSelectors.copyrightText)
    }

    /**
     * Get the robot image Locator
     * @returns {Locator} Locator for 'footerImage' selector
     */
    async robotImage() {
        return await this.page.locator(footerSelectors.footerImage)
    }
}

module.exports = {
    FooterComponents,
    footerSelectors,
}
