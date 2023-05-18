import { Page } from "../abstracts";
import { CredentialsContainer } from "../components/credentials-container";
import { LoginContainer } from "../components/login-container";
import { ErrorContainer } from "../components/error-container"

export class LoginPage extends Page {
    public readonly loginContainer = new LoginContainer(this.page.getByTestId("login-container"))
    public readonly credentialsContainer = new CredentialsContainer(this.page.getByTestId("login-credentials-container"))
    public readonly errorContainer = new ErrorContainer(this.page.locator(".error-message-container"))

    public async loginWithUser(username: string, password: string) {
        await this.loginContainer.usernameInput.fill(username)
        await this.loginContainer.passwordInput.fill(password)
        await this.loginContainer.loginButton.click()
    }
}
