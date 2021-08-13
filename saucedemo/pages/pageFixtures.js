const base = require("@playwright/test")
const { CartController } = require("./cart/controller")
const { CheckoutController } = require("./checkout/controller")
const { CompletedController } = require("./completed/controller")
const { FooterController } = require("./footer/controller")
const { InventoryController } = require("./inventory/controller")
const { InventoryItemController } = require("./inventoryItem/controller")
const { LoginController } = require("./login/controller")
const { NavigationBarController } = require("./navigationBar/controller")
const { OverviewController } = require("./overview/controller")
const { TitleHeaderController } = require("./titleHeader/controller")

module.exports = base.test.extend({
    cartController: async ({ page }, use) => {
        await use(new CartController(page))
    },
    checkoutController: async ({ page }, use) => {
        await use(new CheckoutController(page))
    },
    completedController: async ({ page }, use) => {
        await use(new CompletedController(page))
    },
    footerController: async ({ page }, use) => {
        await use(new FooterController(page))
    },
    inventoryController: async ({ page }, use) => {
        await use(new InventoryController(page))
    },
    inventoryItemController: async ({ page }, use) => {
        await use(new InventoryItemController(page))
    },
    loginController: async ({ page }, use) => {
        await use(new LoginController(page))
    },
    navigationBarController: async ({ page }, use) => {
        await use(new NavigationBarController(page))
    },
    overviewController: async ({ page }, use) => {
        await use(new OverviewController(page))
    },
    titleHeaderController: async ({ page }, use) => {
        await use(new TitleHeaderController(page))
    },
})
