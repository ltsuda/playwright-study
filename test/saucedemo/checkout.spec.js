const { chromium } = require("playwright")
const { expect } = require("chai")
const {
  loginAndSaveCookies,
  loadCookies,
} = require("../../saucedemo/utils/utils")
const { CartController } = require("../../saucedemo/pages/cart/controller")
const {
  InventoryController,
} = require("../../saucedemo/pages/inventory/controller")
const {
  CheckoutController,
} = require("../../saucedemo/pages/checkout/controller")

let browser,
  context,
  page,
  checkoutController,
  cartController,
  inventoryController

describe("Saucedemo CheckoutPage: @checkout", () => {
  before(async () => {
    browser = await chromium.launch()
    await loginAndSaveCookies(browser)
  })

  after(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    context = await browser.newContext()
    await loadCookies(context)
    page = await context.newPage()
    inventoryController = new InventoryController(page)
    await inventoryController.navigate()
    await inventoryController.addRandomItemToCart()
    await inventoryController.goToCart()
    cartController = new CartController(page)
    await cartController.goToCheckout()
    checkoutController = new CheckoutController(page)
  })

  afterEach(async () => {
    await context.close()
  })

  it("should be at Checkout page", async () => {
    expect(await page.url()).to.be.eq(process.env.SAUCE_CHECKOUT_URL)
  })

  it("should go back to Cart if cancel checkout", async () => {
    await checkoutController.cancelCheckout()
    expect(await page.url()).to.be.eq(process.env.SAUCE_CART_URL)
  })

  it("should show firstName error message if empty", async () => {
    await checkoutController.continueCheckout()
    const errorMessage = await checkoutController.getErrorMessage()
    expect(errorMessage).to.be.eq("Error: First Name is required")
  })

  it("should show lastName error message if empty", async () => {
    await checkoutController.fillFirstName("John")
    await checkoutController.continueCheckout()
    const errorMessage = await checkoutController.getErrorMessage()
    expect(errorMessage).to.be.eq("Error: Last Name is required")
  })

  it("should show postalCode error message if empty", async () => {
    await checkoutController.fillFirstName("John")
    await checkoutController.fillLastName("Bong")
    await checkoutController.continueCheckout()
    const errorMessage = await checkoutController.getErrorMessage()
    expect(errorMessage).to.be.eq("Error: Postal Code is required")
  })

  it("should go to Checkout Overview page", async () => {
    await checkoutController.fillFirstName("John")
    await checkoutController.fillLastName("Bong")
    await checkoutController.fillPostalCode("555-5555")
    await checkoutController.continueCheckout()
    expect(await page.url()).to.be.eq(process.env.SAUCE_OVERVIEW_URL)
  })
})
