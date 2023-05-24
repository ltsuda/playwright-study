import { CartPage } from "./pages/cart"
import { CheckoutPage } from "./pages/checkout"
import { CompletedPage } from "./pages/completed"
import { InventoryPage } from "./pages/inventory"
import { InventoryItemPage } from "./pages/inventory-item"
import { LoginPage } from "./pages/login"
import { ReviewPage } from "./pages/review"


export type DemoPages = {
    loginPage: LoginPage,
    cartPage: CartPage,
    checkoutPage: CheckoutPage,
    completedPage: CompletedPage,
    inventoryItemPage: InventoryItemPage,
    inventoryPage: InventoryPage,
    reviewPage: ReviewPage,
}
