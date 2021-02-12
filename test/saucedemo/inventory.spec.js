const inventoryLocators = require("../../saucedemo/resources/locators/inventoryLocators")
const { chromium } = require("playwright")
const { LoginPage } = require("../../saucedemo/models/LoginPage")
const { InventoryPage } = require("../../saucedemo/models/InventoryPage")
const { expect } = require("chai")

let browser, context, page, loginPage

describe("Sauce inventory demo", () => {
  before(async () => {
    browser = await chromium.launch()
  })

  after(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    context = await browser.newContext()
    page = await context.newPage()
    loggedPage = new LoginPage(page)
    await loggedPage.navigate()
    await loggedPage.loginWithStandardUser()
    await page.waitForLoadState("networkidle")
    inventoryPage = new InventoryPage(page)
  })

  afterEach(async () => {
    await context.close()
  })

  it("should be at Inventory page", async () => {
    expect(await page.url()).to.be.equal(process.env.SAUCE_INVENTORY_URL)
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
})
