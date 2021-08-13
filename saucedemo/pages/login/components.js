/* eslint-disable no-unused-vars */
const { Page, ElementHandle } = require("@playwright/test")
/* eslint-enable no-unused-vars */
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

/**
 * Object representing Login's HTML selectors
 */
class LoginComponents {
    /**
     * Create the Login ElementsHandle
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the Login's container ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'loginContainer' locator
     */
    async loginContainer() {
        return await this.page.$(loginLocators.loginContainer)
    }

    /**
     * Get the credentials container's ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'credentialsContainer' locator
     */
    async credentialsContainer() {
        return await this.page.$(loginLocators.credentialsContainer)
    }

    /**
     * Get the credentials text's ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'acceptedUsersText' locator
     */
    async acceptedUsersText() {
        return await this.page.$(loginLocators.acceptedUsersText)
    }

    /**
     * Get the password text's ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'acceptedPasswordText' locator
     */
    async acceptedPasswordText() {
        return await this.page.$(loginLocators.acceptedPasswordText)
    }

    /**
     * Get the error message text's ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'errorText' locator
     */
    async errorMessageText() {
        return await this.page.$(loginLocators.errorText)
    }

    /**
     * Get the checkout's username input ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'usernameInput' locator
     */
    async usernameInput() {
        return await this.page.$(loginLocators.usernameInput)
    }

    /**
     * Get the checkout's password input ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'passwordInput' locator
     */
    async passwordInput() {
        return await this.page.$(loginLocators.passwordInput)
    }

    /**
     * Get the login button ElementHandle
     * @returns {ElementHandle} - ElementHandle for 'loginButton' locator
     */
    async loginButton() {
        return await this.page.$(loginLocators.loginButton)
    }
}

module.exports = {
    LoginComponents,
    loginLocators,
}
