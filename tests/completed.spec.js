const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, MESSAGES, CREDENTIALS } = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe("Saucedemo CompletedPage:  @completed", () => {
    test("should be at Completed page", async ({ page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.COMPLETED}`)
    })

    test("should be back at Inventory page when click at the Back Home button", async ({ completedController, page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await completedController.navigateBackHome()
        expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
    })

    test("should have a thank you header message", async ({ completedController, page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await completedController.getHeaderText()).toBe(MESSAGES.COMPLETED_THANKS)
    })

    test("should have a completed order message", async ({ completedController, page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await completedController.getCompletedText()).toBe(MESSAGES.COMPLETED_DISPATCH)
    })

    test("should have a completed order image", async ({ completedController, page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await completedController.getCompletedImage()).toBe("/static/media/pony-express.46394a5d.png")
    })
})
