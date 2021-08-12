const { test, expect } = require("@playwright/test")
const { CartController } = require("../saucedemo/pages/cart/controller")
const { CheckoutController } = require("../saucedemo/pages/checkout/controller")
const { CompletedController } = require("../saucedemo/pages/completed/controller")
const { InventoryItemController } = require("../saucedemo/pages/inventoryItem/controller")
const { LoginController } = require("../saucedemo/pages/login/controller")
const { NavigationBarController } = require("../saucedemo/pages/navigationBar/controller")
const { OverviewController } = require("../saucedemo/pages/overview/controller")
const { PAGES, MESSAGES } = require("../saucedemo/utils/consts")

test.describe("Saucedemo E2E: @e2e", () => {
    let cartController,
        checkoutController,
        completedController,
        inventoryItemController,
        loginController,
        navigationBarController,
        overviewController

    test.beforeEach(async ({ baseURL, page }) => {
        cartController = new CartController(page)
        checkoutController = new CheckoutController(page)
        completedController = new CompletedController(page)
        inventoryItemController = new InventoryItemController(page)
        loginController = new LoginController(page)
        navigationBarController = new NavigationBarController(page)
        overviewController = new OverviewController(page)
        await page.goto(baseURL)
    })

    test("User should be able to login with a valid credentials @e2e-login", async ({ baseURL, page }) => {
        await loginController.loginWithStandardUser()
        expect(page.url()).toBe(`${baseURL}${PAGES.INVENTORY}`)
    })

    test("User should be able to complete a purchase @e2e-purchase", async ({ baseURL, page }) => {
        await loginController.loginWithStandardUser()
        expect(page.url()).toBe(`${baseURL}${PAGES.INVENTORY}`)

        const item = await inventoryItemController.addRandomItemToCart()

        await cartController.navigate()
        expect(page.url()).toBe(`${baseURL}${PAGES.CART}`)

        const cartItems = await inventoryItemController.getItemsObject("cart")
        expect(cartItems[0]).toStrictEqual(item)
        expect(await navigationBarController.getCartBadgeIfExists()).toBe(String(cartItems.length))

        await cartController.navigateToCheckout()
        expect(page.url()).toBe(`${baseURL}${PAGES.CHECKOUT}`)

        await checkoutController.submitCheckout()
        expect(page.url()).toBe(`${baseURL}${PAGES.OVERVIEW}`)

        const overviewItems = await inventoryItemController.getItemsNameTextByIndex("all", "cart")
        expect(overviewItems[0]).toBe(item.name)
        expect(await overviewController.getPaymentText()).toBe(MESSAGES.OVERVIEW_CARD)
        expect(await overviewController.getShippingText()).toBe(MESSAGES.OVERVIEW_SHIPMENT)

        const subtotal = await overviewController.getSubtotal()
        expect(String(subtotal)).toBe(parseFloat(item.price).toFixed(2))
        expect(await overviewController.getTax()).toBe(await overviewController.calculateTax())

        const calculatedTotal = await overviewController.calculateTotal()
        const totalFromPage = await overviewController.getTotalPrice()
        expect(String(totalFromPage)).toBe(calculatedTotal.toFixed(2))

        await overviewController.finishCheckout()
        expect(page.url()).toBe(`${baseURL}${PAGES.COMPLETED}`)

        expect(await completedController.getHeaderText()).toBe(MESSAGES.COMPLETED_THANKS)
        expect(await completedController.getCompletedText()).toBe(MESSAGES.COMPLETED_DISPATCH)
        expect(await completedController.getCompletedImage()).toBe("/static/media/pony-express.46394a5d.png")
    })
})
