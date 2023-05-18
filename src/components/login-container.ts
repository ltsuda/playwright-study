import { ComponentObject } from "../abstracts";


export class LoginContainer extends ComponentObject {
    public readonly errorContainer = this.host.locator(".error-message-container")
    public readonly loginButton = this.host.getByTestId("button-login")
    public readonly passwordInput = this.host.getByTestId("input-password")
    public readonly usernameInput = this.host.getByTestId("input-username")
}
