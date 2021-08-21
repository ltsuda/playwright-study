/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Navigationbar's HTML selectors
 */
const navigationBarSelectors = {
    navContainer: ".header_container",
    navDetailContainer: ".header_container.inventory_details",
    sideMenu: ".bm-menu-wrap",
    menuButton: "#react-burger-menu-btn",
    menuCloseButton: ".bm-cross-button",
    menuAllItemsLink: "#inventory_sidebar_link",
    menuAboutLink: "#about_sidebar_link",
    menuLogoutLink: "#logout_sidebar_link",
    menuResetStateLink: "#reset_sidebar_link",
    cartLink: ".shopping_cart_link",
    cartBadgeText: ".shopping_cart_badge",
}

/**
 * Class representing playwright's Locators for the navigationbar elements\
 * See {@link https://playwright.dev/docs/api/class-locator}
 */
class NavigationBarComponents {
    /**
     * Create the NavigationBar Locators
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the navigationbar's container Locator
     * @returns {Locator} Locator for 'navContainer' class
     */
    async navContainer() {
        return await this.page.locator(navigationBarSelectors.navContainer)
    }

    /**
     * Get the naviationbar detail's container Locator
     * @returns {Locator} Locator for 'navDetailContainer' class
     */
    async navDetailContainer() {
        return await this.page.locator(navigationBarSelectors.navDetailContainer)
    }

    /**
     * Get the sidemenu container's Locator
     * @returns {Locator} Locator for 'sideMenu' class
     */
    async sideMenu() {
        return await this.page.locator(navigationBarSelectors.sideMenu)
    }

    /**
     * Get the sidemenu button Locator
     * @returns {Locator} Locator for 'menuButton' id
     */
    async menuButton() {
        return await this.page.locator(navigationBarSelectors.menuButton)
    }

    /**
     * Get the close menu button Locator
     * @returns {Locator} Locator for 'menuCloseButton' class
     */
    async menuCloseButton() {
        return await this.page.locator(navigationBarSelectors.menuCloseButton)
    }

    /**
     * Get the all items link Locator
     * @returns {Locator} Locator for 'menuAllItemsLink' id
     */
    async menuAllItemsLink() {
        return await this.page.locator(navigationBarSelectors.menuAllItemsLink)
    }

    /**
     * Get the about link Locator
     * @returns {Locator} Locator for 'menuAboutLink' id
     */
    async menuAboutLink() {
        return await this.page.locator(navigationBarSelectors.menuAboutLink)
    }

    /**
     * Get the logout link Locator
     * @returns {Locator} Locator for 'menuLogoutLink' id
     */
    async menuLogoutLink() {
        return await this.page.locator(navigationBarSelectors.menuLogoutLink)
    }

    /**
     * Get the reset state link Locator
     * @returns {Locator} Locator for 'menuResetStateLink' id
     */
    async menuResetStateLink() {
        return await this.page.locator(navigationBarSelectors.menuResetStateLink)
    }

    /**
     * Get the cart icon link Locator
     * @returns {Locator} Locator for 'cartLink' class
     */
    async cartLink() {
        return await this.page.locator(navigationBarSelectors.cartLink)
    }

    /**
     * Get the cart badge Locator
     * @returns {Locator} Locator for 'cartBadgeText' class
     */
    async cartBadgeText() {
        return await this.page.locator(
            `${navigationBarSelectors.cartLink}` + ">" + `${navigationBarSelectors.cartBadgeText}`
        )
    }
}

module.exports = {
    NavigationBarComponents,
    navigationBarSelectors,
}
