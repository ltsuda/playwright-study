const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, ERRORS } = require("../saucedemo/utils/consts")

test.describe.parallel("Saucedemo LoginPage: @login", () => {
    test.beforeEach(async ({ loginController }) => {
        await loginController.navigate()
    })

    test("should be at the login url", async ({ baseURL, loginController }) => {
        await expect(loginController.page).toHaveURL(`${baseURL}/`)
    })

    test("should show accepted users", async ({ loginController }) => {
        const acceptedUsers = await loginController.getAcceptedUsers()
        expect(acceptedUsers).toEqual(loginController.acceptedUsers)
    })

    test("should show application password ", async ({ loginController }) => {
        const systemPassword = await loginController.components.acceptedPasswordText()
        const passwordRegex = new RegExp(`.*${loginController.password}`, "g")
        await expect(systemPassword).toHaveText(passwordRegex)
    })

    test("should show locked user error", async ({ loginController }) => {
        await loginController.loginWithLockedUser()
        await loginController.page.waitForSelector(loginController.selectors.errorText)
        await expect(await loginController.components.errorMessageText()).toHaveText(ERRORS.LOGIN_LOCKED)
    })

    test("should show username is required error", async ({ loginController }) => {
        await loginController.loginWithoutUser()
        await loginController.page.waitForSelector(loginController.selectors.errorText)
        await expect(await loginController.components.errorMessageText()).toHaveText(ERRORS.LOGIN_USER)
    })

    test("should show username and password doesn't match", async ({ loginController }) => {
        await loginController.loginWithWrongCredential()
        await loginController.page.waitForSelector(loginController.selectors.errorText)
        await expect(await loginController.components.errorMessageText()).toHaveText(ERRORS.LOGIN_CREDENTIALS)
    })

    test("should navigate to inventory page after successful login @smoke", async ({
        baseURL,
        loginController,
        inventoryController,
    }) => {
        await loginController.loginWithStandardUser()
        await expect(inventoryController.page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`)
    })
})
