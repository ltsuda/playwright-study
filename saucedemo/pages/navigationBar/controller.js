/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { NavigationBarComponents, navigationBarLocators } = require("./components")

/**
 * Object representing Navigationbar's HTML selectors
 */
class NavigationBarController {
    /**
     * Create the NavigationBar controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {NavigationBarComponents} components - class with elementsHandle of the navigationbar elements
     * @param {Object} locators - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new NavigationBarComponents(this.page)
        this.locators = navigationBarLocators
    }

    /**
     * Validate if "navContainer" element is visible
     */
    async componentIsVisible() {
        const navContainerElement = await this.components.navContainer()
        await navContainerElement.isVisible()
    }

    /**
     * Validate if "navDetailContainer" element is visible
     */
    async componenDetailIsVisible() {
        const navDetailContainerElement = await this.components.navDetailContainer()
        await navDetailContainerElement.isVisible()
    }
    /**
     * Click at the side menu button
     */
    async openMenu() {
        const menuElement = await this.components.menuButton()
        await menuElement.click()
    }

    /**
     * Click at the close menu button
     */
    async closeMenu() {
        const closeMenuElement = await this.components.menuCloseButton()
        await closeMenuElement.click()
    }

    /**
     * Click at the All Items link
     */
    async allItems() {
        const allItemMenuElement = await this.components.menuAllItemsLink()
        await allItemMenuElement.click()
    }

    /**
     * Click at the About link
     */
    async about() {
        const aboutElement = await this.components.menuAboutLink()
        await aboutElement.click()
    }

    /**
     * Click at the Logout link
     */
    async logout() {
        const logoutMenuElement = await this.components.menuLogoutLink()
        await logoutMenuElement.click()
    }

    /**
     * Click at the Reset state link
     */
    async resetState() {
        const resetMenuElement = await this.components.menuResetStateLink()
        await resetMenuElement.click()
    }

    /**
     * Get the cart badge text if element exists
     * @returns {String|null} the number of items on the cart or null if the badge element doens't exist
     */
    async getCartBadgeIfExists() {
        const badgeElement = await this.components.cartBadgeText()
        if ((await badgeElement) == null) {
            return null
        }
        return await badgeElement.innerText()
    }

    /**
     * Click at the Cart icon link
     */
    async navigateToCart() {
        const cartButtonElement = await this.components.cartLink()
        await cartButtonElement.click()
    }

    /**
     * Validate if sideMenu element is visible
     */
    async isSidemenuVisible() {
        const sideMenuElement = await this.components.sideMenu()
        return await sideMenuElement.isVisible()
    }
}

module.exports = { NavigationBarController }
