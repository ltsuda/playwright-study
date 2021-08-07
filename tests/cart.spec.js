const { test, expect } = require('@playwright/test')
const { NavigationBarController } = require('../saucedemo/pages/navigationBar/controller')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')
const { InventoryItemController } = require('../saucedemo/pages/inventoryItem/controller')
const { CartController } = require('../saucedemo/pages/cart/controller')
const { CheckoutController } = require('../saucedemo/pages/checkout/controller')
const { PAGES, CREDENTIALS, PRODUCTS_INDEX } = require('../saucedemo/utils/consts')
const { setSession } = require('../saucedemo/utils/utils')

test.describe('Saucedemo CartPage: @cart', () => {
  let navigationBarController, inventoryController, inventoryItemController, cartController

  test.beforeEach(async ({ page }) => {
    navigationBarController = new NavigationBarController(page)
    inventoryController = new InventoryController(page)
    inventoryItemController = new InventoryItemController(page)
    cartController = new CartController(page)
    checkoutController = new CheckoutController(page)
  })

  test('should be back at Inventory page when click at the continue shopping button', async ({ page }) => {
    await setSession(page, {
      path: PAGES.CART,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await cartController.continueShopping()
    expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
  })

  test('should be at Checkout page when click at the checkout button', async ({ page }) => {
    await setSession(page, {
      path: PAGES.CART,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await cartController.navigateToCheckout()
    expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.CHECKOUT}`)
  })

  test('should match cart badge with items in cart', async ({ page }) => {
    await setSession(page, {
      path: PAGES.CART,
      username: CREDENTIALS.USERS.STANDARD,
      products: [PRODUCTS_INDEX.BOLT_TSHIRT],
    })
    expect(await inventoryItemController.getItemsCount('cart')).toBe(
      parseInt(await navigationBarController.getCartBadgeIfExists())
    )
  })

  test('should be possible to add an item into the cart', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    const addedItem = await inventoryItemController.addRandomItemToCart()
    await navigationBarController.navigateToCart()
    const itemsInCart = await inventoryItemController.getItemsObject('cart')
    expect(itemsInCart[0]).toStrictEqual(addedItem)
  })

  test('should be possible to remove product from cart', async ({ page }) => {
    await setSession(page, {
      path: PAGES.CART,
      username: CREDENTIALS.USERS.STANDARD,
      products: [PRODUCTS_INDEX.ONESIE],
    })
    expect(await navigationBarController.getCartBadgeIfExists()).toBe('1')
    await inventoryItemController.removeRandomItemFromCart('cart')
    expect(await navigationBarController.getCartBadgeIfExists()).toBeNull()
  })
})
