/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { LoginComponents, loginLocators } = require("./components")
const { PAGES, CREDENTIALS } = require("../../utils/consts")

/**
 * Class representing the Login's page interations
 */
class LoginController {
    /**
     * Create the Login controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {LoginComponents} components - class with elementsHandle of the Login page
     * @param {Object} locators - page's selectors
     * @param {Object} standardUser - username of the standard user
     * @param {Object} lockedUser - username of the locked user
     * @param {Object} problemUser - username of the user that has some issues after login
     * @param {Object} performanceGlitchUser - username of the user that has some performance
     * issues after login
     * @param {Object} acceptedUsers - list of usernames
     * @param {Object} password - the password to login
     */
    constructor(page) {
        this.page = page
        this.components = new LoginComponents(this.page)
        this.locators = loginLocators
        this.standardUser = CREDENTIALS.USERS.STANDARD
        this.lockedUser = CREDENTIALS.USERS.LOCKED
        this.problemUser = CREDENTIALS.USERS.PROBLEM
        this.performanceGlitchUser = CREDENTIALS.USERS.PERFORMANCE
        this.acceptedUsers = Object.values(CREDENTIALS.USERS)
        this.password = CREDENTIALS.PASSWORD
    }

    /**
     * Navigate to the Login page and wait until network is idle
     */
    async navigate() {
        await this.page.goto(`${PAGES.LOGIN}`, "networkidle")
    }

    /**
     * Validate if "loginContainer" and  "credentialsContainer" elements are visible
     */
    async screenIsVisible() {
        const loginContainerElement = await this.components.loginContainer()
        const credentialsContainerElement = await this.components.credentialsContainer()
        await loginContainerElement.isVisible()
        await credentialsContainerElement.isVisible()
    }

    /**
     * Fill up the username input
     */
    async fillUserName(username) {
        const usernameElement = await this.components.usernameInput()
        await usernameElement.fill(username)
    }

    /**
     * Fill up the password input
     */
    async fillPassword(password) {
        const passwordElement = await this.components.passwordInput()
        await passwordElement.fill(password)
    }

    /**
     * Click at the Login button
     */
    async submitLogin() {
        const loginElement = await this.components.loginButton()
        await loginElement.click()
    }

    /**
     * Fill up username and password inputs and click at the Login button
     * @param {String} username - the username credential
     * @param {String} password - the password credential
     * @private
     */
    async _login(username, password) {
        await this.fillUserName(username)
        await this.fillPassword(password)
        await this.submitLogin()
    }

    /**
     * Fill up username and password inputs with the starndard credentials and click at the Login button
     */
    async loginWithStandardUser() {
        await this._login(this.standardUser, this.password)
    }

    /**
     * Fill up username and password inputs with the locked user credentials and click at the Login button
     */
    async loginWithLockedUser() {
        await this._login(this.lockedUser, this.password)
    }

    /**
     * Fill up only the password input and click at the Login button
     */
    async loginWithoutUser() {
        await this._login("", this.password)
    }

    /**
     * Fill up the username and the password input with a invalid user and click at the Login button
     */
    async loginWithWrongCredential() {
        await this._login("noname", this.password)
    }

    /**
     * Get error message
     * @returns {String} login's error message text
     */
    async getErrorMessage() {
        const errorElement = await this.components.errorMessageText()
        return await errorElement.innerText()
    }

    /**
     * Get the list of accepted usernames
     * @returns {String[]} the list of usernames from the credentials section
     */
    async getAcceptedUsers() {
        let acceptedUsers = await this.components.acceptedUsersText()
        acceptedUsers = await acceptedUsers.innerText()
        return acceptedUsers.split("\n").filter(Boolean).slice(1)
    }

    /**
     * Get the system password
     * @returns {String} the password text from the credentials section
     */
    async getPassword() {
        let acceptedPassword = await this.components.acceptedPasswordText()
        acceptedPassword = await acceptedPassword.innerText()
        return acceptedPassword.split("\n").filter(Boolean).slice(1).pop()
    }
}

module.exports = { LoginController }
