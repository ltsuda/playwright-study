const { test, expect } = require('@playwright/test')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { NavigationBarController } = require('../saucedemo/pages/navigationBar/controller')
const { TitleHeaderController } = require('../saucedemo/pages/titleHeader/controller')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')
const { InventoryItemController } = require('../saucedemo/pages/inventoryItem/controller')
const { CartController } = require('../saucedemo/pages/cart/controller')

test.describe('Saucedemo CartPage: @cart', () => {
  let context,
    navigationBarController,
    titleHeaderController,
    inventoryController,
    inventoryItemController,
    cartController,
    timestamp

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
    await inventoryController.navigate()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test('should be at Cart page when clicking at the cart button', async () => {
    await navigationBarController.navigateToCart()
    expect(await cartController.page.url()).toBe('https://www.saucedemo.com/cart.html')
  })

  test('should be back at Inventory page when click at the continue shopping button', async () => {
    await cartController.navigate()
    await cartController.continueShopping()
    expect(await inventoryController.page.url()).toBe('https://www.saucedemo.com/inventory.html')
  })

  test('should match cart badge with items in cart', async () => {
    await inventoryItemController.addRandomItemToCart()
    await navigationBarController.navigateToCart()
    expect(await inventoryItemController.getItemsCount('cart')).toBe(
      parseInt(await navigationBarController.getCartBadgeIfExists())
    )
  })

  test('should be possible to add an item into the cart', async () => {
    const addedItem = await inventoryItemController.addRandomItemToCart()
    await navigationBarController.navigateToCart()
    const itemsInCart = await inventoryItemController.getItemsObject('cart')
    expect(itemsInCart[0]).toStrictEqual(addedItem)
  })
})
