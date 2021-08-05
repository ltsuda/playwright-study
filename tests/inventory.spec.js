const { test, expect } = require('@playwright/test')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { NavigationBarController } = require('../saucedemo/pages/navigationBar/controller')
const { TitleHeaderController } = require('../saucedemo/pages/titleHeader/controller')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')
const { InventoryItemController } = require('../saucedemo/pages/inventoryItem/controller')
const { FooterController } = require('../saucedemo/pages/footer/controller')
const { CartController } = require('../saucedemo/pages/cart/controller')

test.describe('Saucedemo InventoryPage: @inventory', () => {
  let context, navigationBarController, inventoryController, inventoryItemController, footerController, timestamp

  const itemsName = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ]

  test.beforeAll(async ({ browser }) => {
    timestamp = await loginAndSaveCookies(browser)
  })

  test.beforeEach(async ({ browser, baseURL, page }) => {
    context = await browser.newContext({ baseURL: baseURL, storageState: `output/auth/auth_${timestamp}.json` })
    page = await context.newPage()
    navigationBarController = new NavigationBarController(page)
    titleHeaderController = new TitleHeaderController(page)
    inventoryController = new InventoryController(page)
    inventoryItemController = new InventoryItemController(page)
    cartController = new CartController(page)
    footerController = new FooterController(page)
    await inventoryController.navigate()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test('should be at Inventory page after login', async () => {
    expect(await inventoryController.page.url()).toBe('https://www.saucedemo.com/inventory.html')
  })

  test('should be at Cart page when clicking at the cart button', async () => {
    await navigationBarController.navigateToCart()
    expect(await cartController.page.url()).toBe('https://www.saucedemo.com/cart.html')
  })

  test('should show a list of items', async () => {
    expect(await inventoryItemController.getItemsCount('inventory')).toBe(itemsName.length)
  })

  test('should show items sorted alphabetically', async () => {
    expect(await inventoryItemController.getItemsNameTextByIndex('all')).toStrictEqual(itemsName.sort())
  })

  test('should be possible to sort items from Z to A', async () => {
    await titleHeaderController.sortZA()
    expect(await inventoryItemController.getItemsNameTextByIndex('all')).toStrictEqual(itemsName.sort().reverse())
  })

  test('should be possible to sort items prices from Low to High', async () => {
    await titleHeaderController.sortLowHigh()
    const prices = await inventoryItemController.getItemsPriceTextByIndex('all')
    expect(prices).toBe(prices.sort())
  })

  test('should be possible to sort items prices from High to Low', async () => {
    await titleHeaderController.sortHighLow()
    const prices = await inventoryItemController.getItemsPriceTextByIndex('all')
    expect(prices).toBe(prices.sort().reverse())
  })

  test('should be possible to add product to cart', async () => {
    await inventoryItemController.addRandomItemToCart()
    expect(await navigationBarController.getCartBadgeIfExists()).toBe('1')
  })

  test('should be possible to remove product from cart', async () => {
    await inventoryItemController.addRandomItemToCart()
    expect(await navigationBarController.getCartBadgeIfExists()).toBe('1')
    await inventoryItemController.removeRandomItemFromCart()
    expect(await navigationBarController.getCartBadgeIfExists()).toBeNull()
  })

  test('should have Twitter link on footer', async () => {
    expect(await footerController.getTwitterLink()).toBe('https://twitter.com/saucelabs')
  })

  test('should have Facebook link on footer', async () => {
    expect(await footerController.getFacebookLink()).toBe('https://www.facebook.com/saucelabs')
  })

  test('should have LinkedIn link on footer', async () => {
    expect(await footerController.getLinkedinLink()).toBe('https://www.linkedin.com/company/sauce-labs/')
  })

  test('should have Swag Bot image on footer', async () => {
    expect(await footerController.getRobotImage()).toBe('/static/media/SwagBot_Footer_graphic.2e87acec.png')
  })

  test('should have Copyright text on footer', async () => {
    expect(await footerController.getCopyrightText()).toBe(
      '© 2021 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy'
    )
  })
})
