const { chromium } = require('playwright')
const { expect } = require('chai')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { CartController } = require('../saucedemo/pages/cart/controller')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')
const { CheckoutController } = require('../saucedemo/pages/checkout/controller')

let browser,
  context,
  page,
  cartController,
  inventoryController,
  checkoutController,
  overviewController,
  addedItem,
  timestamp

describe('Saucedemo OverviewPage: @overview', () => {
  before(async () => {
    browser = await chromium.launch()
    timestamp = await loginAndSaveCookies(browser)
  })

  after(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    context = await browser.newContext({ storageState: `output/auth_${timestamp}.json` })
    page = await context.newPage()
    inventoryController = new InventoryController(page)
    cartController = new CartController(page)
    checkoutController = new CheckoutController(page)
    await inventoryController.navigate()
    addedItem = await inventoryController.addRandomItemToCart()
    await inventoryController.navigationBarController.navigateToCart()
    await cartController.navigateToCheckout()
    await checkoutController.fillFirstName('John')
    await checkoutController.fillLastName('Bong')
    await checkoutController.fillPostalCode('555-5555')
    overviewController = await checkoutController.continueCheckout()
  })

  afterEach(async () => {
    await context.close()
  })

  it('should be at Overview page', async () => {
    expect(await page.url()).to.be.eq(process.env.SAUCE_OVERVIEW_URL)
  })

  it('should be back at Inventory page when click at the cancel button', async () => {
    await overviewController.cancelCheckout()
    expect(await page.url()).to.be.eq(process.env.SAUCE_INVENTORY_URL)
  })

  it('should have the added items on the Overview Checkout', async () => {
    const overviewItem = await overviewController.itemController.getItemsObject('cart')
    expect(overviewItem[0]).to.be.eql(addedItem)
  })

  it('should have the payment card information', async () => {
    const paymentInfo = await overviewController.getPaymentText()
    expect(paymentInfo).to.be.eq('SauceCard #31337')
  })

  it('should have the shipping information', async () => {
    const shippingInfo = await overviewController.getShippingText()
    expect(shippingInfo).to.be.eq('FREE PONY EXPRESS DELIVERY!')
  })

  it('should have the subtotal (total before tax)', async () => {
    const subtotal = await overviewController.getSubtotal()
    expect(String(subtotal)).to.be.eq(parseFloat(addedItem.price).toFixed(2))
  })

  it('should have the tax calculated as 8% of subtotal', async () => {
    const taxValue = await overviewController.calculateTax()
    const taxFromPage = await overviewController.getTax()
    expect(taxFromPage).to.be.eq(taxValue)
  })

  it('should have the total calculated as subtotal + tax', async () => {
    const calculatedTotal = await overviewController.calculateTotal()
    const totalFromPage = await overviewController.getTotalPrice()
    expect(String(totalFromPage)).to.be.eq(calculatedTotal.toFixed(2))
  })
})
