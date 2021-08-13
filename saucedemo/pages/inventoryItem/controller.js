/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { InventoryItemComponents, inventoryItemLocators } = require("./components")
const { randomInt } = require("../../utils/utils")

/**
 * Class representing the Inventory's item elements interations
 */
class InventoryItemController {
    /**
     * Create the InventoryItem controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {InventoryItemComponents} components - class with elementsHandle of the InventoryItem elements
     */
    constructor(page) {
        this.page = page
        this.components = new InventoryItemComponents(this.page)
        this.locators = inventoryItemLocators
    }

    /**
     * Validate if "itemDetailContainer" element is visible
     */
    async screenIsVisible() {
        const itemDetailContainerElement = await this.components.itemDetailContainer()
        await itemDetailContainerElement.isVisible()
    }

    /**
     * Validate if "cartItemContainer" element is visible
     */
    async screenItemIsVisible() {
        const cartItemContainerElement = await this.components.cartItemContainer()
        await cartItemContainerElement.isVisible()
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
                    ? this.locators.itemNameText.replace("item", "details")
                    : this.locators.itemNameText
            const nameElement = await itemElement.$(namelocator)
            const name = await nameElement.innerText()
            const descriptionLocator =
                fromPage == "details"
                    ? this.locators.itemDescriptionText.replace("item", "details")
                    : this.locators.itemDescriptionText
            const descriptionElement = await itemElement.$(descriptionLocator)
            const description = await descriptionElement.innerText()
            const pricelocator =
                fromPage == "details"
                    ? this.locators.itemPriceText.replace("item", "details")
                    : this.locators.itemPriceText
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
        const removeFromElements = await this.components.removeItemsButton(fromPage)
        const randomElement = removeFromElements[randomInt(removeFromElements.length)]
        await randomElement.click()
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

        const nameElement = await randomElement.$(this.locators.itemNameText)
        const name = await nameElement.innerText()
        const descriptionElement = await randomElement.$(this.locators.itemDescriptionText)
        const description = await descriptionElement.innerText()
        const priceElement = await randomElement.$(this.locators.itemPriceText)
        let price = await priceElement.innerText()
        price = price.replace("$", "")

        const addToCartButton = await randomElement.$(this.locators.addToCartButton)
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
     * Click at the add to cart button
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     */
    async addToCart(fromPage = "details") {
        const addToCartButton = await this.components.addToCartButton(fromPage)
        await addToCartButton.click()
    }

    /**
     * Click at the remove button
     * @param {String} [fromPage="inventory"] - the page that is calling this function like
     * 'cart' or 'inventory
     */
    async removeFromCart(fromPage = "details") {
        const removeFromElements = await this.components.removeItemsButton(fromPage)
        await removeFromElements[0].click()
    }
}

module.exports = { InventoryItemController }
