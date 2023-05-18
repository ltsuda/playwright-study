import { type Locator } from "@playwright/test";
import { ComponentObject } from "../abstracts";

export class LoginContainer extends ComponentObject {
    public readonly errorContainer: Locator = this.host.locator(".error-message-container")
    public readonly loginButton: Locator = this.host.getByTestId("button-login")
    public readonly passwordInput: Locator = this.host.getByTestId("input-password")
    public readonly usernameInput: Locator = this.host.getByTestId("input-username")
}
