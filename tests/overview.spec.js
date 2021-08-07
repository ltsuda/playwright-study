const { test, expect } = require('@playwright/test')
const { InventoryItemController } = require('../saucedemo/pages/inventoryItem/controller')
const { OverviewController } = require('../saucedemo/pages/overview/controller')
const { PAGES, MESSAGES, CREDENTIALS, PRODUCTS_INDEX, PRODUCTS_NAMES } = require('../saucedemo/utils/consts')
const { setSession } = require('../saucedemo/utils/utils')

test.describe('Saucedemo OverviewPage: @overview', () => {
  let inventoryItemController, overviewController

  test.beforeEach(async ({ page }) => {
    inventoryItemController = new InventoryItemController(page)
    overviewController = new OverviewController(page)
  })

  test('should be at Overview page', async ({ page }) => {
    await setSession(page, {
      path: PAGES.OVERVIEW,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.OVERVIEW}`)
  })

  test('should be back at Inventory page when click at the cancel button', async ({ page }) => {
    await setSession(page, {
      path: PAGES.OVERVIEW,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await overviewController.cancelCheckout()
    expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
  })

  test('should be at Completed page when click at the finish button', async ({ page }) => {
    await setSession(page, {
      path: PAGES.OVERVIEW,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await overviewController.finishCheckout()
    expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.COMPLETED}`)
  })

  test('should have the added items on the Overview Checkout', async ({ page }) => {
    await setSession(page, {
      path: PAGES.OVERVIEW,
      username: CREDENTIALS.USERS.STANDARD,
      products: [PRODUCTS_INDEX.BOLT_TSHIRT],
    })
    const overviewItem = await inventoryItemController.getItemsNameTextByIndex('all', 'cart')
    expect(overviewItem[0]).toStrictEqual(PRODUCTS_NAMES.BOLT_TSHIRT)
  })

  test('should have the payment card information', async ({ page }) => {
    await setSession(page, {
      path: PAGES.OVERVIEW,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(await overviewController.getPaymentText()).toBe(MESSAGES.OVERVIEW_CARD)
  })

  test('should have the shipping information', async ({ page }) => {
    await setSession(page, {
      path: PAGES.OVERVIEW,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(await overviewController.getShippingText()).toBe(MESSAGES.OVERVIEW_SHIPMENT)
  })

  test('should have the subtotal (total before tax)', async ({ page }) => {
    await setSession(page, {
      path: PAGES.OVERVIEW,
      username: CREDENTIALS.USERS.STANDARD,
      products: [PRODUCTS_INDEX.BOLT_TSHIRT],
    })
    const subtotal = await overviewController.getSubtotal()
    expect(String(subtotal)).toBe(parseFloat('15.99').toFixed(2))
  })

  test('should have the tax calculated as 8% of subtotal', async ({ page }) => {
    await setSession(page, {
      path: PAGES.OVERVIEW,
      username: CREDENTIALS.USERS.STANDARD,
      products: [PRODUCTS_INDEX.BOLT_TSHIRT],
    })
    expect(await overviewController.getTax()).toBe(await overviewController.calculateTax())
  })

  test('should have the total calculated as subtotal + tax', async ({ page }) => {
    await setSession(page, {
      path: PAGES.OVERVIEW,
      username: CREDENTIALS.USERS.STANDARD,
      products: [PRODUCTS_INDEX.BOLT_TSHIRT],
    })
    const calculatedTotal = await overviewController.calculateTotal()
    const totalFromPage = await overviewController.getTotalPrice()
    expect(String(totalFromPage)).toBe(calculatedTotal.toFixed(2))
  })
})
