const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, CREDENTIALS, PRODUCTS_INDEX } = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe("Saucedemo CartPage: @cart", () => {
    test("should be back at Inventory page when click at the continue shopping button", async ({
        cartController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await cartController.continueShopping()
        expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
    })

    test("should be at Checkout page when click at the checkout button", async ({ cartController, page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await cartController.navigateToCheckout()
        expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.CHECKOUT}`)
    })

    test("should match cart badge with items in cart", async ({
        inventoryItemController,
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
            products: [PRODUCTS_INDEX.BOLT_TSHIRT],
        })
        const itemsCount = String(await inventoryItemController.getItemsCount("cart"))
        await expect(await navigationBarController.components.cartBadgeText()).toHaveText(itemsCount)
    })

    test("should be possible to add an item into the cart @smoke", async ({
        inventoryItemController,
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        const addedItem = await inventoryItemController.addRandomItemToCart()
        await navigationBarController.navigateToCart()
        const itemsInCart = await inventoryItemController.getItemsObject("cart")
        expect(itemsInCart[0]).toStrictEqual(addedItem)
    })

    test("should be possible to remove product from cart", async ({
        inventoryItemController,
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
            products: [PRODUCTS_INDEX.ONESIE],
        })
        await expect(await navigationBarController.components.cartBadgeText()).toHaveText("1")
        await inventoryItemController.removeFromCart("cart")
        await expect(await navigationBarController.components.cartBadgeText()).toHaveCount(0)
    })

    test("should be possible to open sidemenu @slow @smoke", async ({ navigationBarController, page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.openMenu()
        expect(await navigationBarController.isSidemenuVisible()).toBeTruthy()
    })

    test("should be possible to close sidemenu clicking at the X button @slow", async ({
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.openMenu()
        const sideMenuLocator = await navigationBarController.components.sideMenu()
        const sideMenuHandle = await sideMenuLocator.elementHandle()
        await sideMenuHandle.waitForElementState("stable")
        await navigationBarController.closeMenu()
        await sideMenuHandle.waitForElementState("hidden")
        expect(await navigationBarController.isSidemenuVisible()).toBeFalsy()
    })

    test("should remove cart items when clicking at the reset state link on menu", async ({
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
            products: [PRODUCTS_INDEX.ALL_TSHIRT, PRODUCTS_INDEX.BOLT_TSHIRT],
        })
        await expect(await navigationBarController.components.cartBadgeText()).toHaveText("2")
        await navigationBarController.openMenu()
        const sideMenuLocator = await navigationBarController.components.sideMenu()
        const sideMenuHandle = await sideMenuLocator.elementHandle()
        await sideMenuHandle.waitForElementState("stable")
        await navigationBarController.resetState()
        await expect(await navigationBarController.components.cartBadgeText()).toHaveCount(0)
    })

    test("should back at Invetory page when clicking at the all items link on menu", async ({
        baseURL,
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.openMenu()
        await navigationBarController.allItems()
        expect(page.url()).toBe(`${baseURL}${PAGES.INVENTORY}`)
    })

    test("should navigate to SauceLabs page when clicking at the about link on menu @slow", async ({
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.openMenu()
        await navigationBarController.about()
        expect(page.url()).toBe(PAGES.ABOUT)
    })

    test("should be at Login page when clicking at the logout link on menu", async ({
        baseURL,
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.openMenu()
        await navigationBarController.logout()
        expect(page.url()).toBe(`${baseURL}/`)
    })
})
