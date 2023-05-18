import { type Locator } from "@playwright/test"
import { ComponentObject } from "../abstracts"

export class ErrorContainer extends ComponentObject {
    public readonly errorMessage: Locator = this.host.getByTestId("error-text")
    public readonly close: Locator = this.host.getByTestId("button-close-error")
}
