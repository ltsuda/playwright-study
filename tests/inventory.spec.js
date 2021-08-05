const { test, expect } = require('@playwright/test')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')

let context, inventoryController, timestamp

const itemsName = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)',
]

test.describe('Saucedemo InventoryPage: @inventory', () => {
  test.beforeAll(async ({ browser }) => {
    timestamp = await loginAndSaveCookies(browser)
  })

  test.beforeEach(async ({ browser, baseURL, page }) => {
    context = await browser.newContext({ baseURL: baseURL, storageState: `output/auth/auth_${timestamp}.json` })
    page = await context.newPage()
    inventoryController = new InventoryController(page)
    await inventoryController.navigate()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test('should be at Inventory page after login', async () => {
    expect(await inventoryController.page.url()).toBe('https://www.saucedemo.com/inventory.html')
  })

  test('should show a list of items', async () => {
    expect(await inventoryController.itemController.getItemsCount('inventory')).toBe(itemsName.length)
  })

  test('should show items sorted alphabetically', async () => {
    expect(await inventoryController.itemController.getItemsNameTextByIndex('all')).toStrictEqual(itemsName.sort())
  })

  test('should be possible to sort items from Z to A', async () => {
    await inventoryController.sortZA()
    expect(await inventoryController.itemController.getItemsNameTextByIndex('all')).toStrictEqual(
      itemsName.sort().reverse()
    )
  })

  test('should be possible to sort items prices from Low to High', async () => {
    await inventoryController.sortLowHigh()
    const prices = await inventoryController.itemController.getItemsPriceTextByIndex('all')
    expect(prices).toBe(prices.sort())
  })

  test('should be possible to sort items prices from High to Low', async () => {
    await inventoryController.sortHighLow()
    const prices = await inventoryController.itemController.getItemsPriceTextByIndex('all')
    expect(prices).toBe(prices.sort().reverse())
  })

  test('should be possible to add product to cart', async () => {
    await inventoryController.addRandomItemToCart()
    expect(await inventoryController.navigationBarController.getCartBadgeIfExists()).toBe('1')
  })

  test('should be possible to remove product from cart', async () => {
    await inventoryController.addRandomItemToCart()
    expect(await inventoryController.navigationBarController.getCartBadgeIfExists()).toBe('1')
    await inventoryController.itemController.removeRandomItemFromCart()
    expect(await inventoryController.navigationBarController.getCartBadgeIfExists()).toBeNull()
  })

  test('should have Twitter link on footer', async () => {
    expect(await inventoryController.footerController.getTwitterLink()).toBe('https://twitter.com/saucelabs')
  })

  test('should have Facebook link on footer', async () => {
    expect(await inventoryController.footerController.getFacebookLink()).toBe('https://www.facebook.com/saucelabs')
  })

  test('should have LinkedIn link on footer', async () => {
    expect(await inventoryController.footerController.getLinkedinLink()).toBe(
      'https://www.linkedin.com/company/sauce-labs/'
    )
  })

  test('should have Swag Bot image on footer', async () => {
    expect(await inventoryController.footerController.getRobotImage()).toBe(
      '/static/media/SwagBot_Footer_graphic.2e87acec.png'
    )
  })

  test('should have Copyright text on footer', async () => {
    expect(await inventoryController.footerController.getCopyrightText()).toBe(
      '© 2021 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy'
    )
  })
})
