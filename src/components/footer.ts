import { type Locator } from "@playwright/test"
import { ComponentObject } from "../abstracts"

export class Footer extends ComponentObject {
    public readonly twitterLink: Locator = this.host.getByTestId("link-twitter")
    public readonly facebookLink: Locator = this.host.getByTestId("link-facebook")
    public readonly linkedInLink: Locator = this.host.getByTestId("link-linkedin")
    public readonly copyrightText: Locator = this.host.getByTestId("text-copyrights")
}
