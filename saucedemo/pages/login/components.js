const loginLocators = {
    loginContainer: ".login_wrapper",
    credentialsContainer: ".login_credentials_wrap",
    usernameInput: "[data-test='username']",
    passwordInput: "[data-test='password']",
    errorText: "[data-test='error']",
    loginButton: "[id='login-button']",
    acceptedUsersText: "[id='login_credentials']",
    acceptedPasswordText: "[class='login_password']",
}

class LoginComponents {
    constructor(page) {
        this.page = page
    }

    async loginContainer() {
        return await this.page.$(loginLocators.loginContainer)
    }

    async credentialsContainer() {
        return await this.page.$(loginLocators.credentialsContainer)
    }

    async acceptedUsersText() {
        return await this.page.$(loginLocators.acceptedUsersText)
    }

    async acceptedPasswordText() {
        return await this.page.$(loginLocators.acceptedPasswordText)
    }

    async errorMessageText() {
        return await this.page.$(loginLocators.errorText)
    }

    async usernameInput() {
        return await this.page.$(loginLocators.usernameInput)
    }

    async passwordInput() {
        return await this.page.$(loginLocators.passwordInput)
    }

    async loginButton() {
        return await this.page.$(loginLocators.loginButton)
    }
}

module.exports = {
    LoginComponents,
    loginLocators,
}
