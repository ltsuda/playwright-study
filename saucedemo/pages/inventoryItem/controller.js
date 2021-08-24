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
     * @param {InventoryItemComponents} components - class with elementsHandle/locators of the InventoryItem elements
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
        const itemDetailContainerLocator = await this.components.itemDetailContainer()
        await expect(itemDetailContainerLocator).toBeVisible()
    }

    /**
     * Validate if "cartItemContainer" element is visible
     */
    async screenItemIsVisible() {
        const cartItemContainerLocator = await this.components.cartItemContainer()
        await expect(cartItemContainerLocator).toBeVisible()
    }

    /**
     * Get the number of items' elements
     * @param {String} fromPage - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {number} number of items
     */
    async getItemsCount(fromPage) {
        const itemsElements = await this.components.items(fromPage)
        return itemsElements.length
    }

    /**
     * Get an item's property text or a list of them
     * @returns {String[]|String} a text or a list of texts
     * @private
     */
    async _getItemsTextByIndex(elements, index) {
        const texts = []

        for (const element of elements) {
            texts.push(await element.innerText())
        }
        if (index == "all") {
            return texts
        } else {
            return texts[index]
        }
    }

    /**
     * Get an item's name text or a list of name texts
     * @param {number|String} index - the index of the item or the string 'all'
     * to get a list of the names
     * @param {String} fromPage - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {String[]|String} a name or list of names
     */
    async getItemsNameTextByIndex(index, fromPage) {
        const nameElements = await this.components.itemsNameText(fromPage)
        return await this._getItemsTextByIndex(nameElements, index)
    }

    /**
     * Get an item's price text or a list of price texts
     * @param {number|String} index - the index of the item or the string 'all'
     * to get a list of the price
     * @param {String} fromPage - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {String[]|String} a price or list of price
     */
    async getItemsPriceTextByIndex(index, fromPage) {
        const priceElements = await this.components.itemsPriceText(fromPage)
        var prices = await this._getItemsTextByIndex(priceElements, index)
        var priceString = []

        if (index > 0 || index == "all") {
            prices.forEach((price) => {
                priceString.push(price.replace("$", ""))
            })
        }

        return index == "all" ? priceString : priceString[index]
    }

    /**
     * Get an item's object
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     * @returns {Object[]} a list of item's object containing
     * their name, description and price
     */
    async getItemsObject(fromPage = "inventory") {
        const itemsElements = await this.components.items(fromPage)
        let items = []
        for (const itemElement of itemsElements) {
            const namelocator =
                fromPage == "details"
                    ? this.selectors.itemNameText.replace("item", "details")
                    : this.selectors.itemNameText
            const nameElement = await itemElement.$(namelocator)
            const name = await nameElement.innerText()
            const descriptionLocator =
                fromPage == "details"
                    ? this.selectors.itemDescriptionText.replace("item", "details")
                    : this.selectors.itemDescriptionText
            const descriptionElement = await itemElement.$(descriptionLocator)
            const description = await descriptionElement.innerText()
            const pricelocator =
                fromPage == "details"
                    ? this.selectors.itemPriceText.replace("item", "details")
                    : this.selectors.itemPriceText
            const priceElement = await itemElement.$(pricelocator)
            let price = await priceElement.innerText()
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
     * Click at the remove button
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     */
    async removeRandomItemFromCart(fromPage) {
        const removeFromLocator = await this.components.removeItemsButton(fromPage)
        const randomLocator = removeFromLocator[randomInt(removeFromLocator.count())]
        await randomLocator.click()
    }

    /**
     * Click at the add to cart button
     * @returns {Object} the object containing its name, description and price that was added to cart
     */
    async addRandomItemToCart() {
        const itemsCount = await this.getItemsCount("inventory")
        const randomItem = randomInt(itemsCount)
        const itemsElements = await this.components.items()
        const randomElement = itemsElements[randomItem]

        const nameElement = await randomElement.$(this.selectors.itemNameText)
        const name = await nameElement.innerText()
        const descriptionElement = await randomElement.$(this.selectors.itemDescriptionText)
        const description = await descriptionElement.innerText()
        const priceElement = await randomElement.$(this.selectors.itemPriceText)
        let price = await priceElement.innerText()
        price = price.replace("$", "")

        const addToCartButton = await randomElement.$(this.selectors.addToCartButton)
        await addToCartButton.click()

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
        const backToProductsButton = await this.components.backToProductsButton()
        await backToProductsButton.click()
    }

    /**
     * Click at the first locator for the add to cart button
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     */
    async addToCart(fromPage = "details") {
        const addToCartButton = await this.components.addToCartButton(fromPage)
        await addToCartButton.first().click()
    }

    /**
     * Click at the remove button
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     */
    async removeFromCart(fromPage = "details") {
        const removeFromLocator = await this.components.removeItemsButton(fromPage)
        await removeFromLocator.first().click()
    }
}

module.exports = { InventoryItemController }
