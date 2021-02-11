const inventoryLocators = require("../resources/locators/inventoryLocators")

const sortOptions = Object.freeze({
  A_Z: "az",
  Z_A: "za",
  LowHigh: "lohi",
  HighLow: "hilo",
})

class InventoryPage {
  constructor(page) {
    this.page = page
    this.sortOptions = sortOptions
  }

  async _getProductPropertyTextByIndex(propertyLocator, index) {
    const properties = await this.page.$$eval(propertyLocator, (products) =>
      products.map((product) => product.textContent)
    )

    if (index <= properties.length && index > 0) {
      index = index - 1
      return properties[index]
    } else {
      return properties
    }
  }

  async _getProductIndexByName(name) {
    const productsName = await this._getProductPropertyTextByIndex(
      inventoryLocators.PRODUCT_NAME,
      0
    )
    return productsName.indexOf(name)
  }

  async navigate() {
    await this.page.goto(
      process.env.SAUCE_INVENTORY_URL ||
        "https://www.saucedemo.com/inventory.html"
    )
  }

  async goToCart() {
    await this.page.click(inventoryLocators.INVENTORY_CART)
  }

  async sortProductList(option) {
    await this.page.selectOption(inventoryLocators.INVENTORY_SORT, option)
  }

  async getProductsCount() {
    const productList = await this.page.$$(inventoryLocators.PRODUCT_LIST)
    return productList.length
  }

  async getProductsName() {
    return await this._getProductPropertyTextByIndex(
      inventoryLocators.PRODUCT_NAME,
      0
    )
  }

  async getProductsPrice() {
    const priceList = await this._getProductPropertyTextByIndex(
      inventoryLocators.PRODUCT_PRICE,
      0
    )
    return priceList.map((price) => Number(price.replace("$", "")))
  }

  async getProductName(index) {
    return await this._getProductPropertyTextByIndex(
      inventoryLocators.PRODUCT_NAME,
      index
    )
  }

  async getProductDescription(index) {
    return await this._getProductPropertyTextByIndex(
      inventoryLocators.PRODUCT_DESCRIPTION,
      index
    )
  }

  async getProductPrice(index) {
    return await this._getProductPropertyTextByIndex(
      inventoryLocators.PRODUCT_PRICE,
      index
    )
  }

  async getCartBadge() {
    return await this.page.$eval(
      inventoryLocators.INVENTORY_CART_BADGE,
      (badge) => badge.textContent
    )
  }

  async addToCartByName(name) {
    const productIndex = await this._getProductIndexByName(name)
    await page.evaluate(() => {
      document
        .querySelectorAll(inventoryLocators.BTN_ADD_TO_CART)
        [productIndex].click()
    })
  }

  async addFirstProductToCart() {
    const product = await this.page.$eval(
      inventoryLocators.PRODUCT_LIST,
      (product) => {
        const name = product.querySelector(".inventory_item_name").textContent
        const description = product.querySelector(".inventory_item_desc")
          .textContent
        const price = product.querySelector(".inventory_item_price").textContent
        return {
          name: name,
          description: description,
          price: Number(price.replace("$", "")),
        }
      }
    )
    await this.page.click(inventoryLocators.BTN_ADD_TO_CART)
    return product
  }
}

module.exports = { InventoryPage }
