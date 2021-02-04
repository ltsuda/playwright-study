const loginLocators = require("../../saucedemo/resources/locators/loginLocators")
const { chromium } = require("playwright")
const { LoginPage } = require("../../saucedemo/models/Login")
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
})
