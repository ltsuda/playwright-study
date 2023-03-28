const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const {
    PAGES,
    PRODUCTS_NAMES,
    PRODUCTS_INDEX,
    SOCIAL_LINKS,
    MESSAGES,
    CREDENTIALS,
    IMAGES,
} = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe.parallel("Saucedemo InventoryPage: @inventory", () => {
    test("should be at Inventory page after login", async ({ baseURL, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`)
    })

    test("should be at Cart page when clicking at the cart button", async ({
        baseURL,
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.navigateToCart()
        await expect(page).toHaveURL(`${baseURL}${PAGES.CART}`)
    })

    test("should show a list of items @smoke", async ({ inventoryItemController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await inventoryItemController.getItemsCount()).toBe(Object.values(PRODUCTS_NAMES).length)
    })

    test("should show items sorted alphabetically", async ({ inventoryItemController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        expect(await inventoryItemController.getNames()).toStrictEqual(Object.values(PRODUCTS_NAMES).sort())
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
        expect(await inventoryItemController.getNames()).toStrictEqual(Object.values(PRODUCTS_NAMES).sort().reverse())
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
        const prices = await inventoryItemController.getPrices()
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
        const prices = await inventoryItemController.getPrices()
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
        await inventoryItemController.addToCart()
        await expect(await navigationBarController.components.cartBadgeText()).toHaveText("1")
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
        await expect(await navigationBarController.components.cartBadgeText()).toHaveText("1")
        await inventoryItemController.removeFromCart()
        await expect(await navigationBarController.components.cartBadgeText()).toHaveCount(0)
    })

    test("should have Twitter link on footer", async ({ footerController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(await footerController.components.twitterLink()).toHaveAttribute("href", SOCIAL_LINKS.TWITTER)
    })

    test("should have Facebook link on footer", async ({ footerController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(await footerController.components.facebookLink()).toHaveAttribute("href", SOCIAL_LINKS.FACEBOOK)
    })

    test("should have LinkedIn link on footer", async ({ footerController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(await footerController.components.linkedinLink()).toHaveAttribute("href", SOCIAL_LINKS.LINKEDIN)
    })


    test("should have Copyright text on footer", async ({ footerController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(await footerController.components.copyrightText()).toHaveText(MESSAGES.COPYRIGHT)
    })
})
