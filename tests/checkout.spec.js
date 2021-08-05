const { test, expect } = require('@playwright/test')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { CartController } = require('../saucedemo/pages/cart/controller')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')

let context, checkoutController, cartController, inventoryController, timestamp

test.describe('Saucedemo CheckoutPage: @checkout', () => {
  test.beforeAll(async ({ browser }) => {
    timestamp = await loginAndSaveCookies(browser)
  })

  test.beforeEach(async ({ browser, baseURL, page}) => {
    context = await browser.newContext({ baseURL: baseURL, storageState: `output/auth_${timestamp}.json` })
    page = await context.newPage()
    inventoryController = new InventoryController(page)
    await inventoryController.navigate()
    await inventoryController.addRandomItemToCart()
    await inventoryController.navigationBarController.navigateToCart()
    cartController = new CartController(page)
    checkoutController = await cartController.navigateToCheckout()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test('should be at Checkout page', async () => {
    expect(await checkoutController.page.url()).toBe('https://www.saucedemo.com/checkout-step-one.html')
  })

  test('should go back to Cart if cancel checkout', async () => {
    await checkoutController.cancelCheckout()
    expect(await cartController.page.url()).toBe('https://www.saucedemo.com/cart.html')
  })

  test('should show firstName error message if empty', async () => {
    await checkoutController.continueCheckout()
    const errorMessage = await checkoutController.getErrorMessage()
    expect(errorMessage).toBe('Error: First Name is required')
  })

  test('should show lastName error message if empty', async () => {
    await checkoutController.fillFirstName('John')
    await checkoutController.continueCheckout()
    const errorMessage = await checkoutController.getErrorMessage()
    expect(errorMessage).toBe('Error: Last Name is required')
  })

  test('should show postalCode error message if empty', async () => {
    await checkoutController.fillFirstName('John')
    await checkoutController.fillLastName('Bong')
    await checkoutController.continueCheckout()
    const errorMessage = await checkoutController.getErrorMessage()
    expect(errorMessage).toBe('Error: Postal Code is required')
  })

  test('should go to Checkout Overview page', async () => {
    await checkoutController.fillFirstName('John')
    await checkoutController.fillLastName('Bong')
    await checkoutController.fillPostalCode('555-5555')
    const overviewController = await checkoutController.continueCheckout()
    expect(await overviewController.page.url()).toBe('https://www.saucedemo.com/checkout-step-two.html')
  })
})
