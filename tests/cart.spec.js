const { test, expect } = require('@playwright/test')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { CartController } = require('../saucedemo/pages/cart/controller')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')

let context, cartController, inventoryController, timestamp

test.describe('Saucedemo CartPage: @cart', () => {
  test.beforeAll(async ({ browser }) => {
    timestamp = await loginAndSaveCookies(browser)
  })

  test.beforeEach(async ({ browser, baseURL, page}) => {
    context = await browser.newContext({ baseURL: baseURL, storageState: `output/auth_${timestamp}.json` })
    page = await context.newPage()
    inventoryController = new InventoryController(page)
    cartController = new CartController(page)
    await inventoryController.navigate()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test('should be at Cart page when clicking at the cart button', async () => {
    await inventoryController.navigationBarController.navigateToCart()
    expect(await cartController.page.url()).toBe('https://www.saucedemo.com/cart.html')
  })

  test('should be back at Inventory page when click at the continue shopping button', async () => {
    await cartController.navigate()
    inventoryController = await cartController.continueShopping()
    expect(await inventoryController.page.url()).toBe('https://www.saucedemo.com/inventory.html')
  })

  test('should match cart badge with items in cart', async () => {
    await inventoryController.addRandomItemToCart()
    const badgeCount = await inventoryController.navigationBarController.getCartBadgeIfExists()
    await inventoryController.navigationBarController.navigateToCart()
    expect(await cartController.itemController.getItemsCount('cart')).toBe(parseInt(badgeCount))
  })

  test('should be possible to add an item into the cart', async () => {
    const addedItem = await inventoryController.addRandomItemToCart()
    await inventoryController.navigationBarController.navigateToCart()
    const itemsInCart = await cartController.itemController.getItemsObject('cart')
    expect(itemsInCart[0]).toStrictEqual(addedItem)
  })
})
