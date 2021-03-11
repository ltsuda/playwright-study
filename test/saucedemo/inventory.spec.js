const inventoryLocators = require("../../saucedemo/resources/locators/inventoryLocators")
const { chromium } = require("playwright")
const { LoginPage } = require("../../saucedemo/models/LoginPage")
const { InventoryPage } = require("../../saucedemo/models/InventoryPage")
const { expect } = require("chai")
const fs = require("fs")

let browser, context, page, loginPage

describe("Sauce inventory demo", () => {
  before(async () => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()
    loggedPage = new LoginPage(page, context)
    await loggedPage.navigate()
    await loggedPage.loginWithStandardUser()
    await page.waitForLoadState()
    await loggedPage.saveCookies()
    await context.close()
  })

  after(async () => {
    await browser.close()
    try {
      fs.unlinkSync("cookies.json")
    } catch (error) {
      console.log(error)
    }
  })

  beforeEach(async () => {
    context = await browser.newContext()
    page = await context.newPage()
    loggedPage = new LoginPage(page, context)
    await loggedPage.loadCookies()
    inventoryPage = new InventoryPage(page)
    await inventoryPage.navigate()
  })

  afterEach(async () => {
    await context.close()
  })

  it("should be at Inventory page", async () => {
    const url = await page.url()
    expect(url).to.be.equal(process.env.SAUCE_INVENTORY_URL)
  })

  it("shows a list of items", async () => {
    productCount = await inventoryPage.getProductsCount()
    expect(productCount).greaterThan(0)
  })

  it("should be sorted from A-Z", async () => {
    productNameList = await inventoryPage.getProductsName()
    expect(productNameList).be.equal(productNameList.sort())
  })

  it("could sort product list from Z-A", async () => {
    await inventoryPage.sortProductList(inventoryPage.sortOptions.Z_A)
    productNameList = await inventoryPage.getProductsName()
    expect(productNameList).be.equal(productNameList.reverse())
  })

  it("could sort product list from Lower to Higher value", async () => {
    await inventoryPage.sortProductList(inventoryPage.sortOptions.LowHigh)
    productPriceList = await inventoryPage.getProductsPrice()
    expect(productPriceList).be.equal(productPriceList.sort())
  })

  it("could sort product list from Higher to Lower value", async () => {
    await inventoryPage.sortProductList(inventoryPage.sortOptions.HighLow)
    productPriceList = await inventoryPage.getProductsPrice()
    expect(productPriceList).be.equal(productPriceList.reverse())
  })

  it("shows cart badge number", async () => {
    await inventoryPage.addFirstProductToCart()
    expect(await inventoryPage.getCartBadge()).to.be.equal("1")
  })

  it("shows add to cart button", async () => {
    const addToCartButton = await page.$(inventoryLocators.BTN_ADD_TO_CART)
    expect(addToCartButton).not.to.be.null
  })

  it("shows remove button", async () => {
    await inventoryPage.addFirstProductToCart()
    const removeButton = await page.$(inventoryLocators.BTN_REMOVE_FROM_CART)
    expect(removeButton).not.to.be.null
  })

  it("cart badge number should be removed", async () => {
    await inventoryPage.addFirstProductToCart()
    await inventoryPage.removeFirstProductFromCart()
    const hasBadge = await page.waitForSelector(
      inventoryLocators.INVENTORY_CART_BADGE,
      { state: "detached" }
    )
    expect(hasBadge).to.be.null
  })
})
