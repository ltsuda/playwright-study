import { type Locator } from "@playwright/test";
import { ComponentObject } from "../abstracts";


export class CredentialsContainer extends ComponentObject {
    private readonly usernamesSection: Locator = this.host.getByTestId("section-usernames")
    private readonly passwordSection: Locator = this.host.getByTestId("section-password")

    public async getAvailableUsernames(): Promise<string[]> {
        const userSectionText = (await this.usernamesSection.innerText()).split("\n")
        const users = userSectionText.filter((user) => user.endsWith("_user"))
        return users
    }

    public async getAvailablePasswords(): Promise<string[]> {
        const passwordSectionText = (await this.passwordSection.innerText()).split("\n")
        const passwords = passwordSectionText.filter((password) => password.startsWith("secret_"))
        return passwords
    }
}
