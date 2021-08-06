const { test, expect } = require('@playwright/test')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { NavigationBarController } = require('../saucedemo/pages/navigationBar/controller')
const { TitleHeaderController } = require('../saucedemo/pages/titleHeader/controller')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')
const { InventoryItemController } = require('../saucedemo/pages/inventoryItem/controller')
const { CartController } = require('../saucedemo/pages/cart/controller')
const { CheckoutController } = require('../saucedemo/pages/checkout/controller')
const { PAGES } = require('../saucedemo/utils/consts')

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
    checkoutController = new CheckoutController(page)
    await inventoryController.navigate()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test('should be back at Inventory page when click at the continue shopping button', async () => {
    await cartController.navigate()
    await cartController.continueShopping()
    expect(await inventoryController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
  })

  test('should be at Checkout page when click at the checkout button', async () => {
    await cartController.navigate()
    await cartController.navigateToCheckout()
    expect(await checkoutController.page.url()).toBe(`${PAGES.BASEURL}${PAGES.CHECKOUT}`)
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

  test('should be possible to remove product from cart', async () => {
    await inventoryItemController.addRandomItemToCart()
    await navigationBarController.navigateToCart()
    expect(await navigationBarController.getCartBadgeIfExists()).toBe('1')
    await inventoryItemController.removeRandomItemFromCart('cart')
    expect(await navigationBarController.getCartBadgeIfExists()).toBeNull()
  })
})
