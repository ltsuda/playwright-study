const { test, expect } = require('@playwright/test')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { CheckoutController } = require('../saucedemo/pages/checkout/controller')

let context, inventoryController, checkoutController, overviewController, completedController, timestamp

test.describe('Saucedemo CompletedPage:  @completed', () => {
  test.beforeAll(async ({ browser }) => {
    timestamp = await loginAndSaveCookies(browser)
  })

  test.beforeEach(async ({ browser, baseURL, page }) => {
    context = await browser.newContext({ baseURL: baseURL, storageState: `output/auth/auth_${timestamp}.json` })
    page = await context.newPage()
    checkoutController = new CheckoutController(page)
    await checkoutController.navigate()
    await checkoutController.fillFirstName('John')
    await checkoutController.fillLastName('Bong')
    await checkoutController.fillPostalCode('555-5555')
    overviewController = await checkoutController.continueCheckout()
    completedController = await overviewController.finishCheckout()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test('should be at Completed page', async () => {
    expect(await completedController.page.url()).toBe('https://www.saucedemo.com/checkout-complete.html')
  })

  test('should be back at Inventory page when click at the Back Home button', async () => {
    inventoryController = await completedController.navigateBackHome()
    expect(await inventoryController.page.url()).toBe('https://www.saucedemo.com/inventory.html')
  })

  test('should have a thank you header message', async () => {
    expect(await completedController.getHeaderText()).toBe('THANK YOU FOR YOUR ORDER')
  })

  test('should have a completed order message', async () => {
    expect(await completedController.getCompletedText()).toBe(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    )
  })

  test('should have a completed order image', async () => {
    expect(await completedController.getCompletedImage()).toBe('/static/media/pony-express.46394a5d.png')
  })
})
