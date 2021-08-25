const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, MESSAGES, IMAGES } = require("../saucedemo/utils/consts")

test.describe("Saucedemo E2E: @e2e", () => {
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
        await loginController.loginWithStandardUser()
        await expect(page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`)

        const item = await inventoryItemController.addRandomItemToCart()

        await cartController.navigate()
        await expect(page).toHaveURL(`${baseURL}${PAGES.CART}`)

        const cartItems = await inventoryItemController.getItemsObject("cart")
        expect(cartItems[0]).toStrictEqual(item)
        await expect(await navigationBarController.components.cartBadgeText()).toHaveText(String(cartItems.length))

        await cartController.navigateToCheckout()
        await expect(page).toHaveURL(`${baseURL}${PAGES.CHECKOUT}`)

        await checkoutController.submitCheckout()
        await expect(page).toHaveURL(`${baseURL}${PAGES.OVERVIEW}`)

        const overviewItems = await inventoryItemController.getItemsNameTextByIndex("all", "cart")
        expect(overviewItems[0]).toBe(item.name)
        await expect(await overviewController.components.paymentInfoText()).toHaveText(MESSAGES.OVERVIEW_CARD)
        await expect(await overviewController.components.shippingInfoText()).toHaveText(MESSAGES.OVERVIEW_SHIPMENT)

        const subtotal = await overviewController.getSubtotal()
        expect(String(subtotal)).toBe(parseFloat(item.price).toFixed(2))
        expect(await overviewController.getTax()).toBe(await overviewController.calculateTax())

        const calculatedTotal = await overviewController.calculateTotal()
        const totalFromPage = await overviewController.getTotalPrice()
        expect(String(totalFromPage)).toBe(calculatedTotal.toFixed(2))

        await overviewController.finishCheckout()
        await expect(page).toHaveURL(`${baseURL}${PAGES.COMPLETED}`)

        await expect(await completedController.components.completedHeaderText()).toHaveText(MESSAGES.COMPLETED_THANKS)
        await expect(await completedController.components.completedText()).toHaveText(MESSAGES.COMPLETED_DISPATCH)
        await expect(await completedController.components.completedImage()).toHaveAttribute("src", IMAGES.PANY_EXPRESS)
    })
})
