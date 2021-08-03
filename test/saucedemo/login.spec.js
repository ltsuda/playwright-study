const { chromium } = require("playwright")
const { expect } = require("chai")
const { LoginController } = require("../../saucedemo/pages/login/controller")

let browser, context, page, loginController

describe("Saucedemo LoginPage: @login", () => {
  before(async () => {
    browser = await chromium.launch()
  })

  after(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    context = await browser.newContext()
    page = await context.newPage()
    loginController = new LoginController(page)
    await loginController.navigate()
  })

  afterEach(async () => {
    await context.close()
  })

  it("should show accepted users", async () => {
    const acceptedUsers = await loginController.getAcceptedUsers()
    expect(acceptedUsers).eql(loginController.acceptedUsers)
  })

  it("should show application password", async () => {
    const systemPassword = await loginController.getPassword()
    expect(systemPassword).eql(loginController.password)
  })

  it("should show locked user error", async () => {
    await loginController.loginWithLockedUser()
    await page.waitForSelector(loginController.locators.errorText)
    const lockedUserError = await loginController.getErrorMessage()
    expect(lockedUserError).to.be.equal(
      "Epic sadface: Sorry, this user has been locked out."
    )
  })

  it("should show username is required error", async () => {
    await loginController.loginWithoutUser()
    await page.waitForSelector(loginController.locators.errorText)
    const errorMessage = await loginController.getErrorMessage()
    expect(errorMessage).to.be.equal("Epic sadface: Username is required")
  })

  it("should show username and password doesn't match", async () => {
    await loginController.loginWithWrongCredential()
    await page.waitForSelector(loginController.locators.errorText)
    const errorMessage = await loginController.getErrorMessage()
    expect(errorMessage).to.be.equal(
      "Epic sadface: Username and password do not match any user in this service"
    )
  })

  it("should navigate to inventory page after successful login", async () => {
    await loginController.loginWithStandardUser()
    const inventoryURL = await page.url()
    expect(inventoryURL).to.be.equal(process.env.SAUCE_INVENTORY_URL)
  })
})
