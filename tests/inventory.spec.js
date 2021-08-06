const { test, expect } = require('@playwright/test')
const { NavigationBarController } = require('../saucedemo/pages/navigationBar/controller')
const { TitleHeaderController } = require('../saucedemo/pages/titleHeader/controller')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')
const { InventoryItemController } = require('../saucedemo/pages/inventoryItem/controller')
const { FooterController } = require('../saucedemo/pages/footer/controller')
const { CartController } = require('../saucedemo/pages/cart/controller')
const { PAGES, PRODUCTS, SOCIAL_LINKS, MESSAGES, CREDENTIALS } = require('../saucedemo/utils/consts')

test.describe('Saucedemo InventoryPage: @inventory', () => {
  let context, navigationBarController, inventoryController, inventoryItemController, footerController

  test.beforeEach(async ({ browser, baseURL, page }) => {
    context = await browser.newContext({
      baseURL: baseURL,
      storageState: { cookies: [{ name: 'session-username', value: `${CREDENTIALS.USERS.STANDARD}`, url: baseURL }] },
    })
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
    expect(await inventoryController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
  })

  test('should be at Cart page when clicking at the cart button', async () => {
    await navigationBarController.navigateToCart()
    expect(await cartController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.CART}`)
  })

  test('should show a list of items', async () => {
    expect(await inventoryItemController.getItemsCount('inventory')).toBe(Object.values(PRODUCTS).length)
  })

  test('should show items sorted alphabetically', async () => {
    expect(await inventoryItemController.getItemsNameTextByIndex('all')).toStrictEqual(Object.values(PRODUCTS).sort())
  })

  test('should be possible to sort items from Z to A', async () => {
    await titleHeaderController.sortZA()
    expect(await inventoryItemController.getItemsNameTextByIndex('all')).toStrictEqual(
      Object.values(PRODUCTS).sort().reverse()
    )
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
    await inventoryItemController.removeRandomItemFromCart('inventory')
    expect(await navigationBarController.getCartBadgeIfExists()).toBeNull()
  })

  test('should have Twitter link on footer', async () => {
    expect(await footerController.getTwitterLink()).toBe(SOCIAL_LINKS.TWITTER)
  })

  test('should have Facebook link on footer', async () => {
    expect(await footerController.getFacebookLink()).toBe(SOCIAL_LINKS.FACEBOOK)
  })

  test('should have LinkedIn link on footer', async () => {
    expect(await footerController.getLinkedinLink()).toBe(SOCIAL_LINKS.LINKEDIN)
  })

  test('should have Swag Bot image on footer', async () => {
    expect(await footerController.getRobotImage()).toBe('/static/media/SwagBot_Footer_graphic.2e87acec.png')
  })

  test('should have Copyright text on footer', async () => {
    expect(await footerController.getCopyrightText()).toBe(MESSAGES.COPYRIGHT)
  })
})
