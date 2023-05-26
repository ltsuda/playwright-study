import { type Locator } from "@playwright/test";
import { ComponentObject } from "../abstracts";

export class CompletedContainer extends ComponentObject {
    public readonly ponyExpressImage: Locator = this.host.getByTestId("img-pony-express")
    public readonly thankyouMessage: Locator = this.host.getByTestId("header-complete")
    public readonly thankyouDescription: Locator = this.host.getByTestId("header-description")
    public readonly backHomeButton: Locator = this.host.getByTestId("button-back-to-products")
}
