const { chromium } = require('playwright')
const { expect } = require('chai')
const { loginAndSaveCookies } = require('../../saucedemo/utils/utils')
const { InventoryController } = require('../../saucedemo/pages/inventory/controller')

let browser, context, page, inventoryController

const itemsName = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)',
]

describe('Saucedemo InventoryPage: @inventory', () => {
  before(async () => {
    browser = await chromium.launch()
    await loginAndSaveCookies(browser)
  })

  after(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    context = await browser.newContext({ storageState: 'auth.json' })
    page = await context.newPage()
    inventoryController = new InventoryController(page)
    await inventoryController.navigate()
  })

  afterEach(async () => {
    await context.close()
  })

  it('should be at Inventory page after login', async () => {
    expect(await page.url()).to.be.eq(process.env.SAUCE_INVENTORY_URL)
  })

  it('should show a list of items', async () => {
    const itemsCount = await inventoryController.itemController.getItemsCount('inventory')
    expect(itemsCount).to.be.eq(itemsName.length)
  })

  it('should show items sorted alphabetically', async () => {
    const names = await inventoryController.itemController.getItemsNameTextByIndex('all')
    expect(names).to.be.eql(itemsName.sort())
  })

  it('should be possible to sort items from Z to A', async () => {
    await inventoryController.sortZA()
    const names = await inventoryController.itemController.getItemsNameTextByIndex('all')
    expect(names).to.be.eql(itemsName.sort().reverse())
  })

  it('should be possible to sort items prices from Low to High', async () => {
    await inventoryController.sortLowHigh()
    const prices = await inventoryController.itemController.getItemsPriceTextByIndex('all')
    expect(prices).to.be.eql(prices.sort())
  })

  it('should be possible to sort items prices from High to Low', async () => {
    await inventoryController.sortHighLow()
    const prices = await inventoryController.itemController.getItemsPriceTextByIndex('all')
    expect(prices).to.be.eql(prices.sort().reverse())
  })

  it('should be possible to add product to cart', async () => {
    await inventoryController.addRandomItemToCart()
    const badgeNumber = await inventoryController.primaryHeaderController.getCartBadgeIfExists()
    expect(badgeNumber).to.be.eq('1')
  })

  it('should be possible to remove product from cart', async () => {
    await inventoryController.addRandomItemToCart()
    const badgeNumber = await inventoryController.primaryHeaderController.getCartBadgeIfExists()
    expect(badgeNumber).to.be.eq('1')
    await inventoryController.itemController.removeRandomItemFromCart()
    expect(await inventoryController.primaryHeaderController.getCartBadgeIfExists()).to.be.null
  })
})
