/* eslint-disable no-unused-vars */
const { Page, expect } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { LoginComponents, loginSelectors } = require("./components")
const { PAGES, CREDENTIALS } = require("../../utils/consts")

/**
 * Class representing the Login's page interations
 */
class LoginController {
    /**
     * Create the Login controller
     * @param {Page} page - playwright browser's page\
     * See {@link https://playwright.dev/docs/api/class-page}
     * @param {LoginComponents} components - class with Locators of the Login page\
     * See {@link https://playwright.dev/docs/api/class-locator}
     * @param {Object} selectors - page's selectors
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
        this.selectors = loginSelectors
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
        await this.page.goto(`${PAGES.LOGIN}`, { waitUntil: "networkidle" })
    }

    /**
     * Validate if "loginContainer" and  "credentialsContainer" elements are visible
     */
    async screenIsVisible() {
        const loginContainerSelector = this.components.loginContainer()
        const credentialsContainerSelector = this.components.credentialsContainer()
        await expect(loginContainerSelector).toBeVisible()
        await expect(credentialsContainerSelector).toBeVisible()
    }

    /**
     * Fill up the username input
     */
    async fillUserName(username) {
        const usernameSelector = this.components.usernameInput()
        await usernameSelector.type(username)
    }

    /**
     * Fill up the password input
     */
    async fillPassword(password) {
        const passwordSelector = this.components.passwordInput()
        await passwordSelector.type(password)
    }

    /**
     * Click at the Login button
     */
    async submitLogin() {
        const loginSelector = this.components.loginButton()
        await loginSelector.click()
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
     * Fill up username and password inputs with the standard credentials and click at the Login button
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
     * Get the list of accepted usernames
     * @returns {String[]} the list of usernames from the credentials section
     */
    async getAcceptedUsers() {
        let acceptedUsers = this.components.acceptedUsersText()
        acceptedUsers = await acceptedUsers.innerText()
        return acceptedUsers.split("\n").filter(Boolean).slice(1)
    }
}

module.exports = { LoginController }
