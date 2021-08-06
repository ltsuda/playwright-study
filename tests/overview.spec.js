const { test, expect } = require('@playwright/test')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')
const { InventoryItemController } = require('../saucedemo/pages/inventoryItem/controller')
const { OverviewController } = require('../saucedemo/pages/overview/controller')
const { PAGES, MESSAGES, CREDENTIALS } = require('../saucedemo/utils/consts')

test.describe('Saucedemo OverviewPage: @overview', () => {
  let context, inventoryController, inventoryItemController, overviewController, addedItem

  test.beforeEach(async ({ browser, baseURL, page }) => {
    context = await browser.newContext({
      baseURL: baseURL,
      storageState: { cookies: [{ name: 'session-username', value: `${CREDENTIALS.USERS.STANDARD}`, url: baseURL }] },
    })
    page = await context.newPage()
    inventoryController = new InventoryController(page)
    inventoryItemController = new InventoryItemController(page)
    overviewController = new OverviewController(page)
    await inventoryController.navigate()
    addedItem = await inventoryItemController.addRandomItemToCart()
    await overviewController.navigate()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test('should be at Overview page', async () => {
    expect(await overviewController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.OVERVIEW}`)
  })

  test('should be back at Inventory page when click at the cancel button', async () => {
    await overviewController.cancelCheckout()
    expect(await inventoryController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
  })

  test('should be at Completed page when click at the finish button', async () => {
    await overviewController.finishCheckout()
    expect(await inventoryController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.COMPLETED}`)
  })

  test('should have the added items on the Overview Checkout', async () => {
    // TODO: replace steps with fixture and cart product in session state
    const overviewItem = await inventoryItemController.getItemsObject('cart')
    expect(overviewItem[0]).toStrictEqual(addedItem)
  })

  test('should have the payment card information', async () => {
    expect(await overviewController.getPaymentText()).toBe(MESSAGES.OVERVIEW_CARD)
  })

  test('should have the shipping information', async () => {
    expect(await overviewController.getShippingText()).toBe(MESSAGES.OVERVIEW_SHIPMENT)
  })

  test('should have the subtotal (total before tax)', async () => {
    // TODO: replace steps with fixture and cart product in session state
    const subtotal = await overviewController.getSubtotal()
    expect(String(subtotal)).toBe(parseFloat(addedItem.price).toFixed(2))
  })

  test('should have the tax calculated as 8% of subtotal', async () => {
    // TODO: replace steps with fixture and cart product in session state
    expect(await overviewController.getTax()).toBe(await overviewController.calculateTax())
  })

  test('should have the total calculated as subtotal + tax', async () => {
    // TODO: replace steps with fixture and cart product in session state
    const calculatedTotal = await overviewController.calculateTotal()
    const totalFromPage = await overviewController.getTotalPrice()
    expect(String(totalFromPage)).toBe(calculatedTotal.toFixed(2))
  })
})
