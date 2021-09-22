const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, MESSAGES, IMAGES, PERSONAL_INFO } = require("../saucedemo/utils/consts")

test.describe.parallel("Saucedemo E2E: @e2e", () => {
    test.beforeEach(async ({ baseURL, page }) => {
        await page.goto(baseURL)
    })

    test("User should be able to login with a valid credentials @e2e-login", async ({
        baseURL,
        loginController,
        page,
    }) => {
        await loginController.loginWithStandardUser()
        await expect(page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`)
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
    }) => {
        let item

        await test.step("User login with valid credential", async () => {
            await loginController.loginWithStandardUser()
            await expect(page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`)
        })

        await test.step("user login with valid credential", async () => {
            item = await inventoryItemController.addRandomItemToCart()
        })

        await test.step("navigate to cart", async () => {
            await cartController.navigate()
            await expect(page).toHaveURL(`${baseURL}${PAGES.CART}`)
        })

        await test.step("validate item in cart is the same as the one added from invetory", async () => {
            const cartItems = await inventoryItemController.getItemsObject("cart")
            expect(cartItems[0]).toStrictEqual(item)
            await expect(await navigationBarController.components.cartBadgeText()).toHaveText(String(cartItems.length))
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
            await expect(page).toHaveURL(`${PAGES.BASEURL}${PAGES.OVERVIEW}`)
        })

        await test.step("validate item, payment and shipping information", async () => {
            const overviewItems = await inventoryItemController.getNames("cart")
            expect(overviewItems[0]).toBe(item.name)
            await expect(await overviewController.components.paymentInfoText()).toHaveText(MESSAGES.OVERVIEW_CARD)
            await expect(await overviewController.components.shippingInfoText()).toHaveText(MESSAGES.OVERVIEW_SHIPMENT)
        })

        await test.step("validate subtotal, tax and total prices", async () => {
            const subtotal = await overviewController.getSubtotal()
            expect(String(subtotal)).toBe(parseFloat(item.price).toFixed(2))
            expect(await overviewController.getTax()).toBe(await overviewController.calculateTax())
            const calculatedTotal = await overviewController.calculateTotal()
            const totalFromPage = await overviewController.getTotalPrice()
            expect(String(totalFromPage)).toBe(calculatedTotal.toFixed(2))
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
                IMAGES.PANY_EXPRESS
            )
        })
    })
})
