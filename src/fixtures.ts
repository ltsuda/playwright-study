import { test as base } from "@playwright/test"
import { DemoPages } from "./common"
import { CartPage } from "./pages/cart"
import { CheckoutPage } from "./pages/checkout"
import { CompletedPage } from "./pages/completed"
import { InventoryPage } from "./pages/inventory"
import { InventoryItemPage } from "./pages/inventory-item"
import { LoginPage } from "./pages/login"
import { ReviewPage } from "./pages/review"


export const test = base.extend<DemoPages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page))
    },
    completedPage: async ({ page }, use) => {
        await use(new CompletedPage(page))
    },
    inventoryItemPage: async ({ page }, use) => {
        await use(new InventoryItemPage(page))
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page))
    },
    reviewPage: async ({ page }, use) => {
        await use(new ReviewPage(page))
    },
})

export { expect } from '@playwright/test'
