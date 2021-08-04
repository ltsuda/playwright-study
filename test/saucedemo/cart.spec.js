const { chromium } = require('playwright')
const { expect } = require('chai')
const { loginAndSaveCookies } = require('../../saucedemo/utils/utils')
const { CartController } = require('../../saucedemo/pages/cart/controller')
const { InventoryController } = require('../../saucedemo/pages/inventory/controller')

let browser, context, page, cartController, inventoryController, timestamp

describe('Saucedemo CartPage: @cart', () => {
  before(async () => {
    browser = await chromium.launch()
    timestamp = await loginAndSaveCookies(browser)
  })

  after(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    context = await browser.newContext({ storageState: `output/auth_${timestamp}.json` })
    page = await context.newPage()
    inventoryController = new InventoryController(page)
    cartController = new CartController(page)
    await inventoryController.navigate()
  })

  afterEach(async () => {
    await context.close()
  })

  it('should be at Cart page when clicking at the cart button', async () => {
    await inventoryController.navigationBarController.navigateToCart()
    expect(await page.url()).to.be.eq(process.env.SAUCE_CART_URL)
  })

  it('should be back at Inventory page when click at the continue shopping button', async () => {
    await cartController.navigate()
    await cartController.continueShopping()
    expect(await page.url()).to.be.eq(process.env.SAUCE_INVENTORY_URL)
  })

  it('should match cart badge with items in cart', async () => {
    await inventoryController.addRandomItemToCart()
    const badgeCount = await inventoryController.navigationBarController.getCartBadgeIfExists()
    await inventoryController.navigationBarController.navigateToCart()
    const itemsInCartCount = await cartController.itemController.getItemsCount('cart')
    expect(itemsInCartCount).to.be.eq(parseInt(badgeCount))
  })

  it('should be possible to add an item into the cart', async () => {
    const addedItem = await inventoryController.addRandomItemToCart()
    await inventoryController.navigationBarController.navigateToCart()
    const itemsInCart = await cartController.itemController.getItemsObject('cart')
    expect(itemsInCart[0]).to.be.eql(addedItem)
  })
})
