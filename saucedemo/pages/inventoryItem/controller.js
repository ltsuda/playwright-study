/* eslint-disable no-unused-vars */
const { Page, expect } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { InventoryItemComponents, inventoryItemSelectors } = require("./components")
const { randomInt } = require("../../utils/utils")

/**
 * Class representing the Inventory's item elements interations
 */
class InventoryItemController {
    /**
     * Create the InventoryItem controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {InventoryItemComponents} components - class with locators of the InventoryItem elements
     * @param {Object} selectors - page's selectors
     */
    constructor(page) {
        this.page = page
        this.components = new InventoryItemComponents(this.page)
        this.selectors = inventoryItemSelectors
    }

    /**
     * Validate if "itemDetailContainer" element is visible
     */
    async screenIsVisible() {
        const itemDetailContainerLocator = this.components.itemDetailContainer()
        await expect(itemDetailContainerLocator).toBeVisible()
    }

    /**
     * Validate if "cartItemContainer" element is visible
     */
    async screenItemIsVisible() {
        const cartItemContainerLocator = this.components.cartItemContainer()
        await expect(cartItemContainerLocator).toBeVisible()
    }

    /**
     * Get the number of item's Locator
     * @param {String} fromPage - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {number} number of item's locator found
     */
    async getItemsCount(fromPage) {
        const itemsLocator = this.components.items(fromPage)
        return await itemsLocator.count()
    }

    /**
     * Get a list of name texts
     * @param {String} fromPage - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {String[]} a list of names
     */
    async getNames(fromPage) {
        const namesLocator = this.components.names(fromPage)
        return await namesLocator.allInnerTexts()
    }

    /**
     * Get a list of price texts
     * @param {String} fromPage - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {String[]} a list of formated prices (without dollar sign)
     */
    async getPrices(fromPage) {
        const pricesLocator = this.components.prices(fromPage)
        const prices = await pricesLocator.allInnerTexts()
        return prices.map((price) => price.replace("$", ""))
    }

    /**
     * Go to an item's detail page by clicking at its name
     * @param {String} fromPage - the page that is calling this function like
     * 'cart' or 'inventory
     * @param {Number} picker - the item's index
     */
    async goToProductDetail(fromPage, picker) {
        const item = this.components.item(fromPage, picker)
        if (typeof picker === "string") {
            await item.click()
        } else {
            await item.locator(this.selectors.itemNameText).click()
        }
    }

    /**
     * Get item objects
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {Object[]} a list of item objects containing
     * their name, description and price
     */
    async getItemsObject(fromPage = "inventory") {
        const itemsCount = this.getItemsCount(fromPage)
        let items = []
        const nameSelector =
            fromPage == "details" ? this.selectors.itemNameText.replace("item", "details") : this.selectors.itemNameText
        const descSelector =
            fromPage == "details"
                ? this.selectors.itemDescriptionText.replace("item", "details")
                : this.selectors.itemDescriptionText
        const priceSelector =
            fromPage == "details"
                ? this.selectors.itemPriceText.replace("item", "details")
                : this.selectors.itemPriceText

        for (var picker = 0; picker < itemsCount; picker++) {
            const item = this.components.item(fromPage, picker)
            const name = await item.locator(nameSelector).innerText()
            const description = await item.locator(descSelector).innerText()
            let price = await item.locator(priceSelector).innerText()
            price = price.replace("$", "")
            items.push({
                name: name,
                description: description,
                price: price,
            })
        }
        return items
    }

    /**
     * Click at a random remove button
     * @param {String} fromPage - the page that is calling this function like
     * 'cart' or 'inventory
     */
    async removeRandomItemFromCart(fromPage) {
        const removeButtonLocator = this.components.removeItemsButton(fromPage)
        const randomLocator = removeButtonLocator[randomInt(removeButtonLocator.count())]
        await randomLocator.click()
    }

    /**
     * Click at a random add to cart button
     * @returns {Object} the object containing its name, description and price that was added to cart
     */
    async addRandomItemToCart() {
        const fromPage = "inventory"
        const picker = randomInt(this.getItemsCount(fromPage))
        const randomItemLocator = this.components.item(fromPage, picker)
        const name = await randomItemLocator.locator(this.selectors.itemNameText).innerText()
        const description = await randomItemLocator.locator(this.selectors.itemDescriptionText).innerText()
        var price = await randomItemLocator.locator(this.selectors.itemPriceText).innerText()
        price = price.replace("$", "")

        const addButton = randomItemLocator.locator(this.selectors.addToCartButton)
        await addButton.click()

        return {
            name: name,
            description: description,
            price: price,
        }
    }

    /**
     * Click at the back to products button
     */
    async backToProducts() {
        const backToProductsButton = this.components.backToProductsButton()
        await backToProductsButton.click()
    }

    /**
     * Click at the first locator for the add to cart button
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     */
    async addToCart(fromPage = "details") {
        const addToCartButton = this.components.addToCartButton(fromPage)
        await addToCartButton.first().click()
    }

    /**
     * Click at the remove button
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     */
    async removeFromCart(fromPage = "details") {
        const removeFromLocator = this.components.removeItemsButton(fromPage)
        await removeFromLocator.first().click()
    }
}

module.exports = { InventoryItemController }
