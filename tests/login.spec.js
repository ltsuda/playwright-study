const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, ERRORS } = require("../saucedemo/utils/consts")

test.describe("Saucedemo LoginPage: @login", () => {
    test.beforeEach(async ({ loginController }) => {
        await loginController.navigate()
    })

    test("should be at the login url", async ({ loginController }) => {
        expect(await loginController.page.url()).toBe(`${PAGES.BASEURL}/`)
    })

    test("should show accepted users", async ({ loginController }) => {
        const acceptedUsers = await loginController.getAcceptedUsers()
        expect(acceptedUsers).toEqual(loginController.acceptedUsers)
    })

    test("should show application password", async ({ loginController }) => {
        const systemPassword = await loginController.getPassword()
        expect(systemPassword).toEqual(loginController.password)
    })

    test("should show locked user error", async ({ loginController }) => {
        await loginController.loginWithLockedUser()
        await loginController.page.waitForSelector(loginController.locators.errorText)
        expect(await loginController.getErrorMessage()).toEqual(ERRORS.LOGIN_LOCKED)
    })

    test("should show username is required error", async ({ loginController }) => {
        await loginController.loginWithoutUser()
        await loginController.page.waitForSelector(loginController.locators.errorText)
        expect(await loginController.getErrorMessage()).toEqual(ERRORS.LOGIN_USER)
    })

    test("should show username and password doesn't match", async ({ loginController }) => {
        await loginController.loginWithWrongCredential()
        await loginController.page.waitForSelector(loginController.locators.errorText)
        expect(await loginController.getErrorMessage()).toEqual(ERRORS.LOGIN_CREDENTIALS)
    })

    test("should navigate to inventory page after successful login @smoke", async ({
        loginController,
        inventoryController,
    }) => {
        await loginController.loginWithStandardUser()
        expect(await inventoryController.page.url()).toEqual(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
    })
})
