const { test, expect } = require('@playwright/test')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')
const { InventoryItemController } = require('../saucedemo/pages/inventoryItem/controller')
const { CartController } = require('../saucedemo/pages/cart/controller')
const { CheckoutController } = require('../saucedemo/pages/checkout/controller')
const { OverviewController } = require('../saucedemo/pages/overview/controller')
const { PAGES, PERSONAL_INFO, ERRORS } = require('../saucedemo/utils/consts')

test.describe('Saucedemo CheckoutPage: @checkout', () => {
  let context,
    inventoryController,
    inventoryItemController,
    cartController,
    checkoutController,
    overviewController,
    timestamp

  test.beforeAll(async ({ browser }) => {
    timestamp = await loginAndSaveCookies(browser)
  })

  test.beforeEach(async ({ browser, baseURL, page }) => {
    context = await browser.newContext({ baseURL: baseURL, storageState: `output/auth/auth_${timestamp}.json` })
    page = await context.newPage()
    inventoryController = new InventoryController(page)
    inventoryItemController = new InventoryItemController(page)
    cartController = new CartController(page)
    checkoutController = new CheckoutController(page)
    overviewController = new OverviewController(page)
    await inventoryController.navigate()
    await inventoryItemController.addRandomItemToCart()
    await checkoutController.navigate()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test('should be at Checkout page', async () => {
    expect(await checkoutController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.CHECKOUT}`)
  })

  test('should go back to Cart if cancel checkout', async () => {
    await checkoutController.cancelCheckout()
    expect(await cartController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.CART}`)
  })

  test('should show firstName error message if empty', async () => {
    await checkoutController.continueCheckout()
    expect(await checkoutController.getErrorMessage()).toBe(ERRORS.PERSONAL_FIRSTNAME)
  })

  test('should show lastName error message if empty', async () => {
    await checkoutController.fillFirstName(PERSONAL_INFO.USER1.FIRST_NAME)
    await checkoutController.continueCheckout()
    expect(await checkoutController.getErrorMessage()).toBe(ERRORS.PERSONAL_LASTNAME)
  })

  test('should show postalCode error message if empty', async () => {
    await checkoutController.fillFirstName(PERSONAL_INFO.USER1.FIRST_NAME)
    await checkoutController.fillLastName(PERSONAL_INFO.USER1.LAST_NAME)
    await checkoutController.continueCheckout()
    expect(await checkoutController.getErrorMessage()).toBe(ERRORS.PERSONAL_ZIP)
  })

  test('should go to Checkout Overview page', async () => {
    await checkoutController.fillFirstName(PERSONAL_INFO.USER1.FIRST_NAME)
    await checkoutController.fillLastName(PERSONAL_INFO.USER1.LAST_NAME)
    await checkoutController.fillPostalCode(PERSONAL_INFO.USER1.ZIP)
    await checkoutController.continueCheckout()
    expect(await overviewController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.OVERVIEW}`)
  })
})
