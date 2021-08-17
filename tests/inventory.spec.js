const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const {
    PAGES,
    PRODUCTS_NAMES,
    PRODUCTS_INDEX,
    SOCIAL_LINKS,
    MESSAGES,
    CREDENTIALS,
} = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe("Saucedemo InventoryPage: @inventory", () => {
    test("should be at Inventory page after login", async ({ page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
    })

    test("should be at Cart page when clicking at the cart button", async ({ navigationBarController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.navigateToCart()
        expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.CART}`)
    })

    test("should show a list of items @smoke", async ({ inventoryItemController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await inventoryItemController.getItemsCount("inventory")).toBe(Object.values(PRODUCTS_NAMES).length)
    })

    test("should show items sorted alphabetically", async ({ inventoryItemController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await inventoryItemController.getItemsNameTextByIndex("all")).toStrictEqual(
            Object.values(PRODUCTS_NAMES).sort()
        )
    })

    test("should be possible to sort items from Z to A", async ({
        inventoryItemController,
        titleHeaderController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await titleHeaderController.sortZA()
        expect(await inventoryItemController.getItemsNameTextByIndex("all")).toStrictEqual(
            Object.values(PRODUCTS_NAMES).sort().reverse()
        )
    })

    test("should be possible to sort items prices from Low to High", async ({
        inventoryItemController,
        titleHeaderController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await titleHeaderController.sortLowHigh()
        const prices = await inventoryItemController.getItemsPriceTextByIndex("all")
        expect(prices).toBe(prices.sort())
    })

    test("should be possible to sort items prices from High to Low", async ({
        inventoryItemController,
        titleHeaderController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await titleHeaderController.sortHighLow()
        const prices = await inventoryItemController.getItemsPriceTextByIndex("all")
        expect(prices).toBe(prices.sort().reverse())
    })

    test("should be possible to add product to cart @smoke", async ({
        inventoryItemController,
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await inventoryItemController.addToCart("inventory")
        expect(await navigationBarController.getCartBadge()).toBe("1")
    })

    test("should be possible to remove product from cart", async ({
        inventoryItemController,
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
            products: [PRODUCTS_INDEX.ALL_TSHIRT],
        })
        expect(await navigationBarController.getCartBadge()).toBe("1")
        await inventoryItemController.removeFromCart("inventory")
        expect(await navigationBarController.hasCartBadgeLocatorLocator()).toBeFalsy()
    })

    test("should have Twitter link on footer", async ({ footerController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await footerController.getTwitterLink()).toBe(SOCIAL_LINKS.TWITTER)
    })

    test("should have Facebook link on footer", async ({ footerController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await footerController.getFacebookLink()).toBe(SOCIAL_LINKS.FACEBOOK)
    })

    test("should have LinkedIn link on footer", async ({ footerController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await footerController.getLinkedinLink()).toBe(SOCIAL_LINKS.LINKEDIN)
    })

    test("should have Swag Bot image on footer", async ({ footerController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await footerController.getRobotImage()).toBe("/static/media/SwagBot_Footer_graphic.2e87acec.png")
    })

    test("should have Copyright text on footer", async ({ footerController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await footerController.getCopyrightText()).toBe(MESSAGES.COPYRIGHT)
    })
})
