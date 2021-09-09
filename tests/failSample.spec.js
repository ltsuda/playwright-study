const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES } = require("../saucedemo/utils/consts")

// enable video, screenshot and trace as test.fail() will result as 'passed' with the expected failed step,
// so we overwrite the playwright.config.js to force the recording
test.use({ video: "on", screenshot: "on", trace: "on" })
test.fail()

test("marked as 'should fail' on purpose to show expected error evidences @login @should-fail", async ({
    loginController,
    inventoryController,
}, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-hd")
    await loginController.navigate()
    await loginController.loginWithoutUser()
    await expect(inventoryController.page).toHaveURL(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
})
