const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, MESSAGES, CREDENTIALS, PRODUCTS_INDEX, PRODUCTS_NAMES } = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe.parallel("Saucedemo OverviewPage: @overview", () => {
    test("should be at Overview page", async ({ baseURL, page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(page).toHaveURL(`${baseURL}${PAGES.OVERVIEW}`)
    })

    test("should be back at Inventory page when click at the cancel button", async ({
        baseURL,
        overviewController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await overviewController.cancelCheckout()
        await expect(page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`)
    })

    test("should be at Completed page when click at the finish button", async ({
        baseURL,
        overviewController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await overviewController.finishCheckout()
        await expect(page).toHaveURL(`${baseURL}${PAGES.COMPLETED}`)
    })

    test("should have the added items on the Overview Checkout @smoke", async ({ inventoryItemController, page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
            products: [PRODUCTS_INDEX.BOLT_TSHIRT],
        })
        const overviewItems = await inventoryItemController.getNames()
        expect(overviewItems[0]).toStrictEqual(PRODUCTS_NAMES.BOLT_TSHIRT)
    })

    test("should have the payment card information", async ({ overviewController, page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(await overviewController.components.paymentInfoText()).toHaveText(MESSAGES.OVERVIEW_CARD)
    })

    test("should have the shipping information", async ({ overviewController, page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(await overviewController.components.shippingInfoText()).toHaveText(MESSAGES.OVERVIEW_SHIPMENT)
    })

    test("should have the subtotal (total before tax)", async ({ overviewController, page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
            products: [PRODUCTS_INDEX.BOLT_TSHIRT],
        })
        const subtotal = await overviewController.getSubtotal()
        expect(String(subtotal)).toBe(parseFloat("15.99").toFixed(2))
    })

    test("should have the tax calculated as 8% of subtotal", async ({ overviewController, page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
            products: [PRODUCTS_INDEX.BOLT_TSHIRT],
        })
        expect(await overviewController.getTax()).toBe(await overviewController.calculateTax())
    })

    test("should have the total calculated as subtotal + tax", async ({ overviewController, page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
            products: [PRODUCTS_INDEX.BOLT_TSHIRT],
        })
        const calculatedTotal = await overviewController.calculateTotal()
        const totalFromPage = await overviewController.getTotalPrice()
        expect(String(totalFromPage)).toBe(calculatedTotal.toFixed(2))
    })
})
