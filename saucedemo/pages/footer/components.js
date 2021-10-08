/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Footer's HTML selectors
 */
const footerSelectors = {
    footerContainer: "data-test=footer",
    twitterSocialLink: "data-test=link-twitter",
    facebookSocialLink: "data-test=link-facebook",
    linkdinSocialLink: "data-test=link-linkedin",
    copyrightText: "data-test=text-copyrights",
    footerImage: "data-test=img-swagbot",
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
    footerContainer() {
        return this.page.locator(footerSelectors.footerContainer)
    }

    /**
     * Get the twitter link Locator
     * @returns {Locator} Locator for 'twitterSocialLink' selector
     */
    twitterLink() {
        return this.page.locator(footerSelectors.twitterSocialLink)
    }

    /**
     * Get the facebook link Locator
     * @returns {Locator} Locator for 'facebookSocialLink' selector
     */
    facebookLink() {
        return this.page.locator(footerSelectors.facebookSocialLink)
    }

    /**
     * Get the linkedin link Locator
     * @returns {Locator} Locator for 'linkdinSocialLink' selector
     */
    linkedinLink() {
        return this.page.locator(footerSelectors.linkdinSocialLink)
    }

    /**
     * Get the copyright text Locator
     * @returns {Locator} Locator for 'copyrightText' selector
     */
    copyrightText() {
        return this.page.locator(footerSelectors.copyrightText)
    }

    /**
     * Get the robot image Locator
     * @returns {Locator} Locator for 'footerImage' selector
     */
    robotImage() {
        return this.page.locator(footerSelectors.footerImage)
    }
}

module.exports = {
    FooterComponents,
    footerSelectors,
}
