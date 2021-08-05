const { test, expect } = require('@playwright/test')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { CartController } = require('../saucedemo/pages/cart/controller')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')
const { CheckoutController } = require('../saucedemo/pages/checkout/controller')

let context, cartController, inventoryController, checkoutController, overviewController, addedItem, timestamp

test.describe('Saucedemo OverviewPage: @overview', () => {
  test.beforeAll(async ({ browser }) => {
    timestamp = await loginAndSaveCookies(browser)
  })

  test.beforeEach(async ({ browser, baseURL, page }) => {
    context = await browser.newContext({ baseURL: baseURL, storageState: `output/auth/auth_${timestamp}.json` })
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

  test.afterEach(async () => {
    await context.close()
  })

  test('should be at Overview page', async () => {
    expect(await overviewController.page.url()).toBe('https://www.saucedemo.com/checkout-step-two.html')
  })

  test('should be back at Inventory page when click at the cancel button', async () => {
    await overviewController.cancelCheckout()
    expect(await inventoryController.page.url()).toBe('https://www.saucedemo.com/inventory.html')
  })

  test('should have the added items on the Overview Checkout', async () => {
    const overviewItem = await overviewController.itemController.getItemsObject('cart')
    expect(overviewItem[0]).toStrictEqual(addedItem)
  })

  test('should have the payment card information', async () => {
    expect(await overviewController.getPaymentText()).toBe('SauceCard #31337')
  })

  test('should have the shipping information', async () => {
    expect(await overviewController.getShippingText()).toBe('FREE PONY EXPRESS DELIVERY!')
  })

  test('should have the subtotal (total before tax)', async () => {
    const subtotal = await overviewController.getSubtotal()
    expect(String(subtotal)).toBe(parseFloat(addedItem.price).toFixed(2))
  })

  test('should have the tax calculated as 8% of subtotal', async () => {
    expect(await overviewController.getTax()).toBe(await overviewController.calculateTax())
  })

  test('should have the total calculated as subtotal + tax', async () => {
    const calculatedTotal = await overviewController.calculateTotal()
    const totalFromPage = await overviewController.getTotalPrice()
    expect(String(totalFromPage)).toBe(calculatedTotal.toFixed(2))
  })
})
