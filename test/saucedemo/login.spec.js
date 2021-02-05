const loginLocators = require("../../saucedemo/resources/locators/loginLocators")
const { chromium } = require("playwright")
const { LoginPage } = require("../../saucedemo/models/LoginPage")
const { expect } = require("chai")

let browser, context, page, loginPage

describe("Sauce login demo", () => {
  before(async () => {
    browser = await chromium.launch()
  })

  after(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    context = await browser.newContext()
    page = await context.newPage()
    loginPage = new LoginPage(page)
    await loginPage.navigate()
  })

  afterEach(async () => {
    await context.close()
  })

  it("shows accepted users", async () => {
    acceptedUsers = await loginPage.getAcceptedUsersFromPage()
    expect(acceptedUsers).eql(loginPage.acceptedUsers)
  })

  it("shows system password", async () => {
    systemPassword = await loginPage.getPasswordFromPage()
    expect(systemPassword).eql(loginPage.password)
  })

  it("shows locked user error", async () => {
    await loginPage.loginWithLockedUser()
    await page.waitForSelector(loginLocators.ERROR)
    lockedUserError = await loginPage.getErrorFromPage()
    expect(lockedUserError).to.be.equal(
      "Epic sadface: Sorry, this user has been locked out."
    )
  })

  it("shows user name is required error", async () => {
    await loginPage.loginWithoutUser()
    await page.waitForSelector(loginLocators.ERROR)
    lockedUserError = await loginPage.getErrorFromPage()
    expect(lockedUserError).to.be.equal("Epic sadface: Username is required")
  })

  it("shows user and password doesn't match", async () => {
    await loginPage.loginWithWrongCredentials()
    await page.waitForSelector(loginLocators.ERROR)
    lockedUserError = await loginPage.getErrorFromPage()
    expect(lockedUserError).to.be.equal(
      "Epic sadface: Username and password do not match any user in this service"
    )
  })

  it("navigate to inventory page", async () => {
    await loginPage.login()
    inventoryPage = await page.url()
    expect(inventoryPage).to.be.equal(process.env.SAUCE_INVENTORY_URL)
  })
})
