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
  cartController,
  inventoryController,
  checkoutController,
  overviewController,
  completedController

describe("Saucedemo CompletedPage: @completed", () => {
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
    cartController = new CartController(page)
    checkoutController = new CheckoutController(page)
    await inventoryController.navigate()
    await inventoryController.primaryHeaderController.goToCart()
    await cartController.goToCheckout()
    await checkoutController.fillFirstName("John")
    await checkoutController.fillLastName("Bong")
    await checkoutController.fillPostalCode("555-5555")
    overviewController = await checkoutController.continueCheckout()
    completedController = await overviewController.finishCheckout()
  })

  afterEach(async () => {
    await context.close()
  })

  it("should be at Completed page", async () => {
    expect(await page.url()).to.be.eq(process.env.SAUCE_COMPLETED_URL)
  })

  it("should be back at Inventory page when click at the Back Home button", async () => {
    await completedController.backHome()
    expect(await page.url()).to.be.eq(process.env.SAUCE_INVENTORY_URL)
  })

  it("should have a thank you header message", async () => {
    const thankYouMessage = await completedController.getHeaderText()
    expect(thankYouMessage).to.be.eq("THANK YOU FOR YOUR ORDER")
  })

  it("should have a completed order message", async () => {
    const completedMesage = await completedController.getCompletedText()
    expect(completedMesage).to.be.eq(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    )
  })

  it("should have a completed order image", async () => {
    const completedImageSource = await completedController.getCompletedImage()
    expect(completedImageSource).to.be.eq(
      "/static/media/pony-express.46394a5d.png"
    )
  })
})
