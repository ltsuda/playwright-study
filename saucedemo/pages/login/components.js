/* eslint-disable no-unused-vars */
const { Page, Locator } = require("@playwright/test")
/* eslint-enable no-unused-vars */

/**
 * Object representing Login's HTML selectors
 */
const loginSelectors = {
    loginContainer: "data-test=login-container",
    credentialsContainer: "data-test=login-credentials-container",
    usernameInput: "data-test=input-username",
    passwordInput: "data-test=input-password",
    errorText: "data-test=error-text",
    loginButton: "data-test=button-login",
    acceptedUsersText: "data-test=section-usernames",
    acceptedPasswordText: "data-test=section-password",
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
    loginContainer() {
        return this.page.locator(loginSelectors.loginContainer)
    }

    /**
     * Get the credentials container's Locator
     * @returns {Locator} Locator for 'credentialsContainer' class
     */
    credentialsContainer() {
        return this.page.locator(loginSelectors.credentialsContainer)
    }

    /**
     * Get the credentials text's Locator
     * @returns {Locator} Locator for 'acceptedUsersText' id
     */
    acceptedUsersText() {
        return this.page.locator(loginSelectors.acceptedUsersText)
    }

    /**
     * Get the password text's Locator
     * @returns {Locator} Locator for 'acceptedPasswordText' class
     */
    acceptedPasswordText() {
        return this.page.locator(loginSelectors.acceptedPasswordText)
    }

    /**
     * Get the error message text's Locator
     * @returns {Locator} Locator for 'errorText' data-test selector
     */
    errorMessageText() {
        return this.page.locator(loginSelectors.errorText)
    }

    /**
     * Get the username input Locator
     * @returns {Locator} Locator for 'usernameInput' data-test selector
     */
    usernameInput() {
        return this.page.locator(loginSelectors.usernameInput)
    }

    /**
     * Get the password input Locator
     * @returns {Locator} Locator for 'passwordInput' data-test selector
     */
    passwordInput() {
        return this.page.locator(loginSelectors.passwordInput)
    }

    /**
     * Get the login button Locator
     * @returns {Locator} Locator for 'loginButton' id
     */
    loginButton() {
        return this.page.locator(loginSelectors.loginButton)
    }
}

module.exports = {
    LoginComponents,
    loginSelectors,
}
