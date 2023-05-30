import { type Locator } from "@playwright/test"
import { ComponentObject } from "../abstracts"

export class CartContainer extends ComponentObject {
    public readonly cartLink: Locator = this.host.getByTestId("link-cart")
    public readonly cartBadge: Locator = this.host.getByTestId("cart-badge")
}
