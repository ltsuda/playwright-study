const { test, expect } = require("@playwright/test")
const { CartController } = require("../saucedemo/pages/cart/controller")
const { CheckoutController } = require("../saucedemo/pages/checkout/controller")
const { CompletedController } = require("../saucedemo/pages/completed/controller")
const { FooterController } = require("../saucedemo/pages/footer/controller")
const { InventoryController } = require("../saucedemo/pages/inventory/controller")
const { InventoryItemController } = require("../saucedemo/pages/inventoryItem/controller")
const { LoginController } = require("../saucedemo/pages/login/controller")
const { NavigationBarController } = require("../saucedemo/pages/navigationBar/controller")
const { OverviewController } = require("../saucedemo/pages/overview/controller")
const { PAGES, CREDENTIALS, PRODUCTS_INDEX } = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe("Saucedemo Visual: @visual", () => {
    let cartController,
        checkoutController,
        completedController,
        footerController,
        inventoryController,
        inventoryItemController,
        loginController,
        navigationBarController,
        overviewController

    test.beforeEach(async ({ baseURL, page }) => {
        cartController = new CartController(page)
        checkoutController = new CheckoutController(page)
        completedController = new CompletedController(page)
        footerController = new FooterController(page)
        inventoryItemController = new InventoryItemController(page)
        inventoryController = new InventoryController(page)
        loginController = new LoginController(page)
        navigationBarController = new NavigationBarController(page)
        overviewController = new OverviewController(page)
        await page.goto(baseURL)
    })

    test("Login page shows correct elements", async ({ page }) => {
        await loginController.screenIsVisible()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("login-screen.png")
    })

    test("Navigationbar shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.componentIsVisible()
        const navigationBarElement = await navigationBarController.components.navContainer()
        expect(await navigationBarElement.screenshot({ fullPage: true })).toMatchSnapshot("navigationbar-screen.png")
    })

    test("Navigationbar details shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: `${PAGES.INVENTORY_ITEM}?id=${PRODUCTS_INDEX.JACKET}`,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.componenDetailIsVisible()
        const navigationBarDetailElement = await navigationBarController.components.navDetailContainer()
        expect(await navigationBarDetailElement.screenshot({ fullPage: true })).toMatchSnapshot(
            "navigationbar-item-screen.png"
        )
    })

    test("Footer shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await footerController.componentIsVisible()
        const footerElement = await footerController.components.footerContainer()
        expect(await footerElement.screenshot({ fullPage: true })).toMatchSnapshot("footer-screen.png")
    })

    test("Inventory page shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await inventoryController.screenIsVisible()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("inventory-screen.png")
    })

    test("InventoryItem page shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: `${PAGES.INVENTORY_ITEM}?id=${PRODUCTS_INDEX.BIKELIGHT}`,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await inventoryItemController.screenIsVisible()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("inventoryItem-screen.png")
    })

    test("Empty Cart page shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await cartController.screenIsVisible()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("cart-empty-screen.png")
    })

    test("Cart with item page shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
            products: [ PRODUCTS_INDEX.BACKPACK ],
        })
        await cartController.screenIsVisible()
        await inventoryItemController.screenItemIsVisible()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("cart-item-screen.png")
    })

    test("Checkout page shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CHECKOUT,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await checkoutController.screenIsVisible()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("checkout-screen.png")
    })

    test("Empty Overview page shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await overviewController.screenIsVisible()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("overview-empty-screen.png")
    })

    test("Overview with item page shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: PAGES.OVERVIEW,
            username: CREDENTIALS.USERS.STANDARD,
            products: [ PRODUCTS_INDEX.ALL_TSHIRT ],
        })
        await overviewController.screenIsVisible()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("overview-item-screen.png")
    })

    test("Completed page shows correct elements", async ({ page }) => {
        await setSession(page, {
            path: PAGES.COMPLETED,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await completedController.screenIsVisible()
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot("completed-screen.png")
    })
})
