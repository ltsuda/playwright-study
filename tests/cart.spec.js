const { test, expect } = require("@playwright/test")
const { NavigationBarController } = require("../saucedemo/pages/navigationBar/controller")
const { InventoryItemController } = require("../saucedemo/pages/inventoryItem/controller")
const { CartController } = require("../saucedemo/pages/cart/controller")
const { PAGES, CREDENTIALS, PRODUCTS_INDEX } = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe("Saucedemo CartPage: @cart", () => {
    let navigationBarController, inventoryItemController, cartController

    test.beforeEach(async ({ page }) => {
        navigationBarController = new NavigationBarController(page)
        inventoryItemController = new InventoryItemController(page)
        cartController = new CartController(page)
    })

    test("should be back at Inventory page when click at the continue shopping button", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await cartController.continueShopping()
        expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.INVENTORY}`)
    })

    test("should be at Checkout page when click at the checkout button", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await cartController.navigateToCheckout()
        expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.CHECKOUT}`)
    })

    test("should match cart badge with items in cart", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
            products: [ PRODUCTS_INDEX.BOLT_TSHIRT ],
        })
        expect(await inventoryItemController.getItemsCount("cart")).toBe(
            parseInt(await navigationBarController.getCartBadgeIfExists())
        )
    })

    test("should be possible to add an item into the cart @smoke", async ({ page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        const addedItem = await inventoryItemController.addRandomItemToCart()
        await navigationBarController.navigateToCart()
        const itemsInCart = await inventoryItemController.getItemsObject("cart")
        expect(itemsInCart[0]).toStrictEqual(addedItem)
    })

    test("should be possible to remove product from cart", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
            products: [ PRODUCTS_INDEX.ONESIE ],
        })
        expect(await navigationBarController.getCartBadgeIfExists()).toBe("1")
        await inventoryItemController.removeFromCart("cart")
        expect(await navigationBarController.getCartBadgeIfExists()).toBeNull()
    })

    test("should be possible to open sidemenu @slow @smoke", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.openMenu()
        const sideMenuElement = await navigationBarController.components.sideMenu()
        await sideMenuElement.waitForElementState("stable")
        expect(await navigationBarController.isSidemenuVisible()).toBeTruthy()
    })

    test("should be possible to close sidemenu clicking at the X button @slow", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.openMenu()
        const sideMenuElement = await navigationBarController.components.sideMenu()
        await sideMenuElement.waitForElementState("stable")
        await navigationBarController.closeMenu()
        await sideMenuElement.waitForElementState("hidden")
        expect(await navigationBarController.isSidemenuVisible()).toBeFalsy()
    })

    test("should remove cart items when clicking at the reset state link on menu", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
            products: [ PRODUCTS_INDEX.ALL_TSHIRT, PRODUCTS_INDEX.BOLT_TSHIRT ],
        })
        expect(await navigationBarController.getCartBadgeIfExists()).toBe("2")
        await navigationBarController.openMenu()
        await navigationBarController.resetState()
        expect(await navigationBarController.getCartBadgeIfExists()).toBeNull()
    })

    test("should back at Invetory page when clicking at the all items link on menu", async ({ baseURL, page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.openMenu()
        await navigationBarController.allItems()
        expect(page.url()).toBe(`${baseURL}${PAGES.INVENTORY}`)
    })

    test("should navigate to SauceLabs page when clicking at the about link on menu @slow", async ({ page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.openMenu()
        await navigationBarController.about()
        expect(page.url()).toBe(PAGES.ABOUT)
    })

    test("should be at Login page when clicking at the logout link on menu", async ({ baseURL, page }) => {
        await setSession(page, {
            path: PAGES.CART,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await navigationBarController.openMenu()
        await navigationBarController.logout()
        expect(page.url()).toBe(`${baseURL}/`)
    })
})
