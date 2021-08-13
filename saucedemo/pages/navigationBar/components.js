/* eslint-disable no-unused-vars */
const { Page, ElementHandle } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Navigationbar's HTML selectors
 */
const navigationBarLocators = {
    navContainer: ".header_container",
    navDetailContainer: ".header_container.inventory_details",
    sideMenu: ".bm-menu-wrap",
    menuButton: "#react-burger-menu-btn",
    menuCloseButton: ".bm-cross-button",
    menuAllItemsLink: "#inventory_sidebar_link",
    menuAboutLink: "#about_sidebar_link",
    menuLogoutLink: "#logout_sidebar_link",
    menuResetStateLink: "#reset_sidebar_link",
    cartLink: "[class='shopping_cart_link']",
    cartBadgeText: "[class='shopping_cart_badge']",
}

/**
 * Class representing playwright's ElementHandles for the navigationbar elements\
 * See {@link https://playwright.dev/docs/api/class-elementhandle}
 */
class NavigationBarComponents {
    /**
     * Create the Footer ElementsHandle
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the navigationbar's container ElementHandle
     * @returns {ElementHandle} ElementHandle for 'navContainer' locator
     */
    async navContainer() {
        return await this.page.$(navigationBarLocators.navContainer)
    }

    /**
     * Get the naviationbar detail's container ElementHandle
     * @returns {ElementHandle} ElementHandle for 'navDetailContainer' locator
     */
    async navDetailContainer() {
        return await this.page.$(navigationBarLocators.navDetailContainer)
    }

    /**
     * Get the sidemenu's container ElementHandle
     * @returns {ElementHandle} ElementHandle for 'sideMenu' locator
     */
    async sideMenu() {
        return await this.page.$(navigationBarLocators.sideMenu)
    }

    /**
     * Get the sidemenu button ElementHandle
     * @returns {ElementHandle} ElementHandle for 'menuButton' locator
     */
    async menuButton() {
        return await this.page.$(navigationBarLocators.menuButton)
    }

    /**
     * Get the close menu button ElementHandle
     * @returns {ElementHandle} ElementHandle for 'menuCloseButton' locator
     */
    async menuCloseButton() {
        return await this.page.$(navigationBarLocators.menuCloseButton)
    }

    /**
     * Get the all items link ElementHandle
     * @returns {ElementHandle} ElementHandle for 'menuAllItemsLink' locator
     */
    async menuAllItemsLink() {
        return await this.page.$(navigationBarLocators.menuAllItemsLink)
    }

    /**
     * Get the about link ElementHandle
     * @returns {ElementHandle} ElementHandle for 'menuAboutLink' locator
     */
    async menuAboutLink() {
        return await this.page.$(navigationBarLocators.menuAboutLink)
    }

    /**
     * Get the logout link ElementHandle
     * @returns {ElementHandle} ElementHandle for 'menuLogoutLink' locator
     */
    async menuLogoutLink() {
        return await this.page.$(navigationBarLocators.menuLogoutLink)
    }

    /**
     * Get the reset state link ElementHandle
     * @returns {ElementHandle} ElementHandle for 'menuResetStateLink' locator
     */
    async menuResetStateLink() {
        return await this.page.$(navigationBarLocators.menuResetStateLink)
    }

    /**
     * Get the cart icon link ElementHandle
     * @returns {ElementHandle} ElementHandle for 'cartLink' locator
     */
    async cartLink() {
        return await this.page.$(navigationBarLocators.cartLink)
    }

    /**
     * Get the cart badge ElementHandle
     * @returns {ElementHandle} ElementHandle for 'cartBadgeText' locator
     */
    async cartBadgeText() {
        return await this.page.$(`${navigationBarLocators.cartLink}` + ">" + `${navigationBarLocators.cartBadgeText}`)
    }
}

module.exports = {
    NavigationBarComponents,
    navigationBarLocators,
}
