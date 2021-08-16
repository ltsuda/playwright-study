/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Login's HTML selectors
 */
const loginSelectors = {
    loginContainer: ".login_wrapper",
    credentialsContainer: ".login_credentials_wrap",
    usernameInput: "[data-test='username']",
    passwordInput: "[data-test='password']",
    errorText: "[data-test='error']",
    loginButton: "#login-button",
    acceptedUsersText: "#login_credentials",
    acceptedPasswordText: ".login_password",
}

/**
 * Class representing playwright's Locators from /login.html page\
 * See {@link https://playwright.dev/docs/api/class-locator}
 */
class LoginComponents {
    /**
     * Create the Login Locators
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}  for the Locator API
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Get the Login's container Locator
     * @returns {Locator} Locator for 'loginContainer' class
     */
    async loginContainer() {
        return await this.page.locator(loginSelectors.loginContainer)
    }

    /**
     * Get the credentials container's Locator
     * @returns {Locator} Locator for 'credentialsContainer' class
     */
    async credentialsContainer() {
        return await this.page.locator(loginSelectors.credentialsContainer)
    }

    /**
     * Get the credentials text's Locator
     * @returns {Locator} Locator for 'acceptedUsersText' id
     */
    async acceptedUsersText() {
        return await this.page.locator(loginSelectors.acceptedUsersText)
    }

    /**
     * Get the password text's Locator
     * @returns {Locator} Locator for 'acceptedPasswordText' class
     */
    async acceptedPasswordText() {
        return await this.page.locator(loginSelectors.acceptedPasswordText)
    }

    /**
     * Get the error message text's Locator
     * @returns {Locator} Locator for 'errorText' data-test selector
     */
    async errorMessageText() {
        return await this.page.locator(loginSelectors.errorText)
    }

    /**
     * Get the username input Locator
     * @returns {Locator} Locator for 'usernameInput' data-test selector
     */
    async usernameInput() {
        return await this.page.locator(loginSelectors.usernameInput)
    }

    /**
     * Get the password input Locator
     * @returns {Locator} Locator for 'passwordInput' data-test selector
     */
    async passwordInput() {
        return await this.page.locator(loginSelectors.passwordInput)
    }

    /**
     * Get the login button Locator
     * @returns {Locator} Locator for 'loginButton' id
     */
    async loginButton() {
        return await this.page.locator(loginSelectors.loginButton)
    }
}

module.exports = {
    LoginComponents,
    loginSelectors,
}
