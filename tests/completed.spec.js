const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, MESSAGES, CREDENTIALS, IMAGES } = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe.parallel("Saucedemo CompletedPage:  @completed", () => {
    test("should be at Completed page", async ({ page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(page).toHaveURL(`${PAGES.BASEURL}${PAGES.COMPLETED}`)
    })

    test("should be back at Inventory page when click at the Back Home button", async ({
        completedController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await completedController.navigateBackHome()
        await expect(page).toHaveURL(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
    })

    test("should have a thank you header message", async ({ completedController, page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(await completedController.components.completedHeaderText()).toHaveText(MESSAGES.COMPLETED_THANKS)
    })

    test("should have a completed order message", async ({ completedController, page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(await completedController.components.completedText()).toHaveText(MESSAGES.COMPLETED_DISPATCH)
    })

    test("should have a completed order image", async ({ completedController, page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(await completedController.components.completedImage()).toHaveAttribute("src", IMAGES.PANY_EXPRESS)
    })
})
