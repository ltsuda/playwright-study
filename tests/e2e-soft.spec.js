const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, MESSAGES, IMAGES, PERSONAL_INFO } = require("../saucedemo/utils/consts")

// enable video, screenshot and trace as test.fail() will result as 'passed' with the expected failed step,
// so we overwrite the playwright.config.js to force the recording
test.use({ video: "on", screenshot: "on", trace: "on" })
test.fail()

test.describe("Saucedemo E2E with soft assertions and messages from v1.19: @e2e-soft", () => {
    test.beforeEach(async ({ baseURL, page }) => {
        await page.goto(baseURL)
    })

    test("User should be able to complete a purchase @e2e-purchase", async ({
        baseURL,
        cartController,
        checkoutController,
        completedController,
        inventoryItemController,
        loginController,
        navigationBarController,
        overviewController,
        page,
    }, testInfo) => {
        test.skip(testInfo.project.name !== "chromium-hd")
        let item

        await test.step("User login with valid credential", async () => {
            await loginController.loginWithStandardUser()
            await expect(page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`)
        })

        await test.step("user adds an random item to cart", async () => {
            item = await inventoryItemController.addRandomItemToCart()
            await expect
                .soft(await navigationBarController.components.cartBadgeText(), "Should soft fail on purpose")
                .toHaveText("0")
        })

        await test.step("navigate to cart", async () => {
            await cartController.navigate()
            await expect(page).toHaveURL(`${baseURL}${PAGES.CART}`)
        })

        await test.step("validate item in cart is the same as the one added from inventory", async () => {
            const cartItems = await inventoryItemController.getItemsObject()
            expect(cartItems[0]).toStrictEqual(item)
            await expect
                .soft(await navigationBarController.components.cartBadgeText(), "Should soft fail on purpose")
                .toHaveText(String(cartItems.length + 1))
        })

        await test.step("navigate to checkout", async () => {
            await cartController.navigateToCheckout()
            await expect(page).toHaveURL(`${baseURL}${PAGES.CHECKOUT}`)
        })

        await test.step("fill in checkout's personal information and continue", async () => {
            await checkoutController.fillFirstName(PERSONAL_INFO.USER1.FIRST_NAME)
            await checkoutController.fillLastName(PERSONAL_INFO.USER1.LAST_NAME)
            await checkoutController.fillPostalCode(PERSONAL_INFO.USER1.ZIP)
            await checkoutController.continueCheckout()
            await expect.soft(page, "Should soft fail on purpose").toHaveURL(`${baseURL}/invalid`)
        })

        await test.step("validate item, payment and shipping information", async () => {
            const overviewItems = await inventoryItemController.getNames()
            expect(overviewItems[0]).toBe(item.name)
            await expect(await overviewController.components.paymentInfoText()).toHaveText(MESSAGES.OVERVIEW_CARD)
            await expect(await overviewController.components.shippingInfoText()).toHaveText(MESSAGES.OVERVIEW_SHIPMENT)
            await expect
                .soft(await overviewController.components.shippingInfoText(), "Should soft fail on purpose")
                .toHaveText("Soft fail message")
        })

        await test.step("validate subtotal, tax and total prices", async () => {
            const subtotal = await overviewController.getSubtotal()
            expect(String(subtotal)).toBe(parseFloat(item.price).toFixed(2))
            expect(await overviewController.getTax()).toBe(await overviewController.calculateTax())
            const calculatedTotal = await overviewController.calculateTotal()
            const totalFromPage = await overviewController.getTotalPrice()
            expect(String(totalFromPage)).toBe(calculatedTotal.toFixed(2))
            expect.soft(String(totalFromPage)).toBe("0.00")
        })

        await test.step("finish purchase and validate completion page", async () => {
            await overviewController.finishCheckout()
            await expect(page).toHaveURL(`${baseURL}${PAGES.COMPLETED}`)
            await expect(await completedController.components.completedHeaderText()).toHaveText(
                MESSAGES.COMPLETED_THANKS
            )
            await expect(await completedController.components.completedText()).toHaveText(MESSAGES.COMPLETED_DISPATCH)
            await expect(await completedController.components.completedImage()).toHaveAttribute(
                "src",
                IMAGES.PONY_EXPRESS
            )
        })
    })
})
