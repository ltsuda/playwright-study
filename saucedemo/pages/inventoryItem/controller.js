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
        return await itemDetailContainerLocator.isVisible()
    }

    /**
     * Validate if "itemContainer" element is visible
     */
    async screenItemIsVisible() {
        const itemContainerLocator = this.components.itemContainer()
        return await itemContainerLocator.isVisible()
    }

    /**
     * Get the number of item's Locator
     * @returns {number} number of item's locator found
     */
    async getItemsCount() {
        const itemsLocator = this.components.items()
        return await itemsLocator.count()
    }

    /**
     * Get a list of name texts
     * @returns {String[]} a list of names
     */
    async getNames() {
        const namesLocator = this.components.names()
        return await namesLocator.allInnerTexts()
    }

    /**
     * Get a list of price texts
     * @returns {String[]} a list of formated prices (without dollar sign)
     */
    async getPrices() {
        const pricesLocator = this.components.prices()
        const prices = await pricesLocator.allInnerTexts()
        return prices.map((price) => price.replace("$", ""))
    }

    /**
     * Go to an item's detail page by clicking at its name
     * @param {Number} picker - the item's index
     */
    async goToProductDetail(picker) {
        const item = this.components.item(picker)
        if (typeof picker === "string") {
            await item.click()
        } else {
            await item.locator(this.selectors.itemNameText).click()
        }
    }

    /**
     * Get item objects
     * @returns {Object[]} a list of item objects containing
     * their name, description and price
     */
    async getItemsObject() {
        const itemsCount = await this.getItemsCount()
        let items = []
        const nameSelector = this.selectors.itemNameText
        const descSelector = this.selectors.itemDescriptionText
        const priceSelector = this.selectors.itemPriceText

        for (var picker = 0; picker < itemsCount; picker++) {
            const item = this.components.item(picker)
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
     */
    async removeRandomItemFromCart() {
        const removeButtonLocator = this.components.removeItemsButton()
        const randomLocator = removeButtonLocator[randomInt(removeButtonLocator.count())]
        await randomLocator.click()
    }

    /**
     * Click at a random add to cart button
     * @returns {Object} the object containing its name, description and price that was added to cart
     */
    async addRandomItemToCart() {
        const picker = randomInt(await this.getItemsCount())
        const randomItemLocator = this.components.item(picker)
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
     */
    async addToCart() {
        const addToCartButton = this.components.addToCartButton()
        await addToCartButton.first().click()
    }

    /**
     * Click at the remove button
     */
    async removeFromCart() {
        const removeFromLocator = this.components.removeItemsButton()
        await removeFromLocator.first().click()
    }
}

module.exports = { InventoryItemController }
