const { chromium } = require('playwright')
const { expect } = require('chai')
const { loginAndSaveCookies } = require('../saucedemo/utils/utils')
const { InventoryController } = require('../saucedemo/pages/inventory/controller')

let browser, context, page, inventoryController, timestamp

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
    timestamp = await loginAndSaveCookies(browser)
  })

  after(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    context = await browser.newContext({ storageState: `output/auth_${timestamp}.json` })
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
    const badgeNumber = await inventoryController.navigationBarController.getCartBadgeIfExists()
    expect(badgeNumber).to.be.eq('1')
  })

  it('should be possible to remove product from cart', async () => {
    await inventoryController.addRandomItemToCart()
    const badgeNumber = await inventoryController.navigationBarController.getCartBadgeIfExists()
    expect(badgeNumber).to.be.eq('1')
    await inventoryController.itemController.removeRandomItemFromCart()
    expect(await inventoryController.navigationBarController.getCartBadgeIfExists()).to.be.null
  })

  it('should have Twitter link on footer', async () => {
    const twitterHref = await inventoryController.footerController.getTwitterLink()
    expect(twitterHref).to.be.eq('https://twitter.com/saucelabs')
  })

  it('should have Facebook link on footer', async () => {
    const facebookHref = await inventoryController.footerController.getFacebookLink()
    expect(facebookHref).to.be.eq('https://www.facebook.com/saucelabs')
  })

  it('should have LinkedIn link on footer', async () => {
    const linkedinHref = await inventoryController.footerController.getLinkedinLink()
    expect(linkedinHref).to.be.eq('https://www.linkedin.com/company/sauce-labs/')
  })

  it('should have Swag Bot image on footer', async () => {
    const swagRobotImage = await inventoryController.footerController.getRobotImage()
    expect(swagRobotImage).to.be.eq('/static/media/SwagBot_Footer_graphic.2e87acec.png')
  })

  it('should have Copyright text on footer', async () => {
    const copyrightText = await inventoryController.footerController.getCopyrightText()
    expect(copyrightText).to.be.eq('© 2021 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
  })
})
