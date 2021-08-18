/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { NavigationBarComponents, navigationBarSelectors } = require("./components")

/**
 * Class representing the Navigationbar element's interations
 */
class NavigationBarController {
    /**
     * Create the NavigationBar controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {NavigationBarComponents} components - class with Locators of the navigationbar elements
     * @param {Object} locators - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new NavigationBarComponents(this.page)
        this.selectors = navigationBarSelectors
    }

    /**
     * Validate if "navContainer" element is visible
     */
    async componentIsVisible() {
        const navContainerLocator = await this.components.navContainer()
        await navContainerLocator.isVisible()
    }

    /**
     * Validate if "navDetailContainer" element is visible
     */
    async componenDetailIsVisible() {
        const navDetailContainerLocator = await this.components.navDetailContainer()
        await navDetailContainerLocator.isVisible()
    }
    /**
     * Click at the side menu button
     */
    async openMenu() {
        const menuLocator = await this.components.menuButton()
        await menuLocator.click()
    }

    /**
     * Click at the close menu button
     */
    async closeMenu() {
        const closeMenuLocator = await this.components.menuCloseButton()
        await closeMenuLocator.click()
    }

    /**
     * Click at the All Items link
     */
    async allItems() {
        const allItemMenuLocator = await this.components.menuAllItemsLink()
        await allItemMenuLocator.click()
    }

    /**
     * Click at the About link
     */
    async about() {
        const aboutLocator = await this.components.menuAboutLink()
        await aboutLocator.click()
    }

    /**
     * Click at the Logout link
     */
    async logout() {
        const logoutMenuLocator = await this.components.menuLogoutLink()
        await logoutMenuLocator.click()
    }

    /**
     * Click at the Reset state link
     */
    async resetState() {
        const resetMenuLocator = await this.components.menuResetStateLink()
        await resetMenuLocator.click()
    }

    /**
     * Get the cart badge text
     * @returns {String} the number of items on the cart
     */
    async getCartBadge() {
        const badgeLocator = await this.components.cartBadgeText()
        return await badgeLocator.innerText()
    }

    /**
     * Get cartBadge locator count
     * @returns true if badgeLocator exists
     */
    async hasCartBadgeLocator() {
        const badgeLocator = await this.components.cartBadgeText()
        return await badgeLocator.count() !== 0
    }

    /**
     * Click at the Cart icon link
     */
    async navigateToCart() {
        const cartButtonLocator = await this.components.cartLink()
        await cartButtonLocator.click()
    }

    /**
     * Validate if sideMenu element is visible
     */
    async isSidemenuVisible() {
        const sideMenuLocator = await this.components.sideMenu()
        return await sideMenuLocator.isVisible()
    }
}

module.exports = { NavigationBarController }
