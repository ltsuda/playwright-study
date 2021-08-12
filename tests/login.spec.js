const { test, expect } = require("@playwright/test")
const { LoginController } = require("../saucedemo/pages/login/controller")
const { InventoryController } = require("../saucedemo/pages/inventory/controller")
const { PAGES, ERRORS } = require("../saucedemo/utils/consts")

test.describe("Saucedemo LoginPage: @login", () => {
    let loginController, inventoryController

    test.beforeEach(async ({ page }) => {
        loginController = new LoginController(page)
        inventoryController = new InventoryController(page)
        await loginController.navigate()
    })

    test("should be at the login url", async () => {
        expect(await loginController.page.url()).toBe(`${PAGES.BASEURL}/`)
    })

    test("should show accepted users", async () => {
        const acceptedUsers = await loginController.getAcceptedUsers()
        expect(acceptedUsers).toEqual(loginController.acceptedUsers)
    })

    test("should show application password", async () => {
        const systemPassword = await loginController.getPassword()
        expect(systemPassword).toEqual(loginController.password)
    })

    test("should show locked user error", async () => {
        await loginController.loginWithLockedUser()
        await loginController.page.waitForSelector(loginController.locators.errorText)
        expect(await loginController.getErrorMessage()).toEqual(ERRORS.LOGIN_LOCKED)
    })

    test("should show username is required error", async () => {
        await loginController.loginWithoutUser()
        await loginController.page.waitForSelector(loginController.locators.errorText)
        expect(await loginController.getErrorMessage()).toEqual(ERRORS.LOGIN_USER)
    })

    test("should show username and password doesn't match", async () => {
        await loginController.loginWithWrongCredential()
        await loginController.page.waitForSelector(loginController.locators.errorText)
        expect(await loginController.getErrorMessage()).toEqual(ERRORS.LOGIN_CREDENTIALS)
    })

    test("should navigate to inventory page after successful login @smoke", async () => {
        await loginController.loginWithStandardUser()
        expect(await inventoryController.page.url()).toEqual(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
    })
})
