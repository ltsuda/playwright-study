const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, CREDENTIALS, PRODUCTS_INDEX } = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe.parallel("Saucedemo Visual: @visual", () => {
    test.beforeEach(async ({ baseURL, page }) => {
        await page.goto(baseURL)
    })

    test("Login page shows correct elements", async ({ loginController, page }) => {
        expect(await loginController.screenIsVisible()).toBeTruthy()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("login-screen.png")
    })

    test("Navigationbar shows correct elements", async ({ navigationBarController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await navigationBarController.componentIsVisible()).toBeTruthy()
        const navigationBarElement = await navigationBarController.components.navContainer()
        expect(await navigationBarElement.screenshot({ fullPage: true })).toMatchSnapshot("navigationbar-screen.png")
    })

    test("Navigationbar details shows correct elements", async ({ navigationBarController, page }) => {
        await setSession(page, {
            path: `${PAGES.INVENTORY_ITEM}?id=${PRODUCTS_INDEX.JACKET}`,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await navigationBarController.componentIsVisible()).toBeTruthy()
        const navigationBarElement = await navigationBarController.components.navContainer()
        expect(await navigationBarElement.screenshot({ fullPage: true })).toMatchSnapshot(
            "navigationbar-item-screen.png"
        )
    })

    test("Footer shows correct elements", async ({ footerController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await footerController.componentIsVisible()).toBeTruthy()
        const footerElement = await footerController.components.footerContainer()
        expect(await footerElement.screenshot({ fullPage: true })).toMatchSnapshot("footer-screen.png")
    })

    test("Inventory page shows correct elements", async ({ inventoryController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await inventoryController.screenIsVisible()).toBeTruthy()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("inventory-screen.png")
    })

    test("InventoryItem page shows correct elements", async ({ inventoryItemController, page }) => {
        await setSession(page, {
            path: `${PAGES.INVENTORY_ITEM}?id=${PRODUCTS_INDEX.BIKELIGHT}`,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await inventoryItemController.screenIsVisible()).toBeTruthy()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("inventoryItem-screen.png")
    })

    test("Empty Cart page shows correct elements", async ({ cartController, page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await cartController.screenIsVisible()).toBeTruthy()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("cart-empty-screen.png")
    })

    test("Cart with item page shows correct elements", async ({
        cartController,
        inventoryItemController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
            products: [PRODUCTS_INDEX.BACKPACK],
        })
        expect(await cartController.screenIsVisible()).toBeTruthy()
        expect(await inventoryItemController.screenItemIsVisible()).toBeTruthy()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("cart-item-screen.png")
    })

    test("Checkout page shows correct elements", async ({ checkoutController, page }) => {
        await setSession(page, {
            path: PAGES.CHECKOUT,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await checkoutController.screenIsVisible()).toBeTruthy()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("checkout-screen.png")
    })

    test("Empty Overview page shows correct elements", async ({ overviewController, page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await overviewController.screenIsVisible()).toBeTruthy()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("overview-empty-screen.png")
    })

    test("Overview with item page shows correct elements", async ({ overviewController, page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
            products: [PRODUCTS_INDEX.ALL_TSHIRT],
        })
        expect(await overviewController.screenIsVisible()).toBeTruthy()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("overview-item-screen.png")
    })

    test("Completed page shows correct elements", async ({ completedController, page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await completedController.screenIsVisible()).toBeTruthy()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("completed-screen.png")
    })
})
