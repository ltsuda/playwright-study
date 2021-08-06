const { test, expect } = require('@playwright/test')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')
const { CompletedController } = require('../saucedemo/pages/completed/controller')
const { PAGES, MESSAGES, CREDENTIALS } = require('../saucedemo/utils/consts')

test.describe('Saucedemo CompletedPage:  @completed', () => {
  let context, inventoryController, completedController

  test.beforeEach(async ({ browser, baseURL, page }) => {
    context = await browser.newContext({
      baseURL: baseURL,
      storageState: { cookies: [{ name: 'session-username', value: `${CREDENTIALS.USERS.STANDARD}`, url: baseURL }] },
    })
    page = await context.newPage()
    inventoryController = new InventoryController(page)
    completedController = new CompletedController(page)
    await completedController.navigate()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test('should be at Completed page', async () => {
    expect(await completedController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.COMPLETED}`)
  })

  test('should be back at Inventory page when click at the Back Home button', async () => {
    await completedController.navigateBackHome()
    expect(await inventoryController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
  })

  test('should have a thank you header message', async () => {
    expect(await completedController.getHeaderText()).toBe(MESSAGES.COMPLETED_THANKS)
  })

  test('should have a completed order message', async () => {
    expect(await completedController.getCompletedText()).toBe(MESSAGES.COMPLETED_DISPATCH)
  })

  test('should have a completed order image', async () => {
    expect(await completedController.getCompletedImage()).toBe('/static/media/pony-express.46394a5d.png')
  })
})
