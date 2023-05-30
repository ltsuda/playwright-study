import { type Locator } from "@playwright/test"
import { ComponentObject } from "../abstracts"

export class SecondaryHeader extends ComponentObject {
    public readonly title: Locator = this.host.getByTestId("title")
}
