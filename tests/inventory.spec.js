const { test, expect } = require('@playwright/test')
const { NavigationBarController } = require('../saucedemo/pages/navigationBar/controller')
const { TitleHeaderController } = require('../saucedemo/pages/titleHeader/controller')
const { InventoryItemController } = require('../saucedemo/pages/inventoryItem/controller')
const { FooterController } = require('../saucedemo/pages/footer/controller')
const { CartController } = require('../saucedemo/pages/cart/controller')
const {
  PAGES,
  PRODUCTS_NAMES,
  PRODUCTS_INDEX,
  SOCIAL_LINKS,
  MESSAGES,
  CREDENTIALS,
} = require('../saucedemo/utils/consts')
const { setSession } = require('../saucedemo/utils/utils')

test.describe('Saucedemo InventoryPage: @inventory', () => {
  let navigationBarController, inventoryItemController, footerController

  test.beforeEach(async ({ page }) => {
    navigationBarController = new NavigationBarController(page)
    titleHeaderController = new TitleHeaderController(page)
    inventoryItemController = new InventoryItemController(page)
    cartController = new CartController(page)
    footerController = new FooterController(page)
  })

  test('should be at Inventory page after login', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
  })

  test('should be at Cart page when clicking at the cart button', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await navigationBarController.navigateToCart()
    expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.CART}`)
  })

  test('should show a list of items @smoke', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(await inventoryItemController.getItemsCount('inventory')).toBe(Object.values(PRODUCTS_NAMES).length)
  })

  test('should show items sorted alphabetically', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(await inventoryItemController.getItemsNameTextByIndex('all')).toStrictEqual(
      Object.values(PRODUCTS_NAMES).sort()
    )
  })

  test('should be possible to sort items from Z to A', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await titleHeaderController.sortZA()
    expect(await inventoryItemController.getItemsNameTextByIndex('all')).toStrictEqual(
      Object.values(PRODUCTS_NAMES).sort().reverse()
    )
  })

  test('should be possible to sort items prices from Low to High', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await titleHeaderController.sortLowHigh()
    const prices = await inventoryItemController.getItemsPriceTextByIndex('all')
    expect(prices).toBe(prices.sort())
  })

  test('should be possible to sort items prices from High to Low', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await titleHeaderController.sortHighLow()
    const prices = await inventoryItemController.getItemsPriceTextByIndex('all')
    expect(prices).toBe(prices.sort().reverse())
  })

  test('should be possible to add product to cart @smoke', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await inventoryItemController.addToCart('inventory')
    expect(await navigationBarController.getCartBadgeIfExists()).toBe('1')
  })

  test('should be possible to remove product from cart', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
      products: [PRODUCTS_INDEX.ALL_TSHIRT],
    })
    expect(await navigationBarController.getCartBadgeIfExists()).toBe('1')
    await inventoryItemController.removeFromCart('inventory')
    expect(await navigationBarController.getCartBadgeIfExists()).toBeNull()
  })

  test('should have Twitter link on footer', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(await footerController.getTwitterLink()).toBe(SOCIAL_LINKS.TWITTER)
  })

  test('should have Facebook link on footer', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(await footerController.getFacebookLink()).toBe(SOCIAL_LINKS.FACEBOOK)
  })

  test('should have LinkedIn link on footer', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(await footerController.getLinkedinLink()).toBe(SOCIAL_LINKS.LINKEDIN)
  })

  test('should have Swag Bot image on footer', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(await footerController.getRobotImage()).toBe('/static/media/SwagBot_Footer_graphic.2e87acec.png')
  })

  test('should have Copyright text on footer', async ({ page }) => {
    await setSession(page, {
      path: PAGES.INVENTORY,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(await footerController.getCopyrightText()).toBe(MESSAGES.COPYRIGHT)
  })
})
