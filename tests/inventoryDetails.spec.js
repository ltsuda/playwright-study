const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, PRODUCTS_INDEX, CREDENTIALS } = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe("Saucedemo InventoryPage: @details", () => {
    test("should be at Inventory page when clicking at the back to products", async ({
        baseURL,
        inventoryItemController,
        page,
    }) => {
        await setSession(page, {
            path: `${PAGES.INVENTORY_ITEM}?id=${PRODUCTS_INDEX.ALL_TSHIRT}`,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await inventoryItemController.backToProducts()
        expect(page.url()).toBe(`${baseURL}${PAGES.INVENTORY}`)
    })

    test("should navigate to product's detail page when clicking at it", async ({ inventoryItemController, page }) => {
        await setSession(page, {
            path: PAGES.INVENTORY,
            username: CREDENTIALS.USERS.STANDARD,
        })
        const items = await inventoryItemController.getItemsObject()
        const itemNameElements = await inventoryItemController.components.itemsNameText()
        await itemNameElements[0].click()
        const itemDetail = await inventoryItemController.getItemsObject("details")
        expect(items[0]).toStrictEqual(itemDetail[0])
    })

    test("should be possible to add the product to cart", async ({
        inventoryItemController,
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: `${PAGES.INVENTORY_ITEM}?id=${PRODUCTS_INDEX.BIKELIGHT}`,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await inventoryItemController.addToCart()
        expect(await navigationBarController.getCartBadgeIfExists()).toBe("1")
    })

    test("should be possible to remove the product from cart", async ({
        inventoryItemController,
        navigationBarController,
        page,
    }) => {
        await setSession(page, {
            path: `${PAGES.INVENTORY_ITEM}?id=${PRODUCTS_INDEX.BIKELIGHT}`,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await inventoryItemController.addToCart()
        await inventoryItemController.removeFromCart()
        expect(await navigationBarController.getCartBadgeIfExists()).toBeNull()
    })
})