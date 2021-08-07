const { LoginComponents, loginLocators } = require('./components')
const { PAGES, CREDENTIALS } = require('../../utils/consts')

class LoginController {
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

  async navigate() {
    await this.page.goto(`${PAGES.BASEURL}${PAGES.LOGIN}`, 'networkidle')
  }

  async fillUserName(username) {
    const usernameElement = await this.components.usernameInput()
    await usernameElement.fill(username)
  }

  async fillPassword(password) {
    const passwordElement = await this.components.passwordInput()
    await passwordElement.fill(password)
  }

  async submitLogin() {
    const loginElement = await this.components.loginButton()
    await loginElement.click()
  }

  async _login(username, password) {
    await this.fillUserName(username)
    await this.fillPassword(password)
    await this.submitLogin()
  }

  async loginWithStandardUser() {
    await this._login(this.standardUser, this.password)
  }

  async loginWithLockedUser() {
    await this._login(this.lockedUser, this.password)
  }

  async loginWithoutUser() {
    await this._login('', this.password)
  }

  async loginWithWrongCredential() {
    await this._login('noname', this.password)
  }

  async getErrorMessage() {
    const errorElement = await this.components.errorMessageText()
    return await errorElement.innerText()
  }

  async getAcceptedUsers() {
    let acceptedUsers = await this.components.acceptedUsersText()
    acceptedUsers = await acceptedUsers.innerText()
    return acceptedUsers.split('\n').filter(Boolean).slice(1)
  }

  async getPassword() {
    let acceptedPassword = await this.components.acceptedPasswordText()
    acceptedPassword = await acceptedPassword.innerText()
    return acceptedPassword.split('\n').filter(Boolean).slice(1).pop()
  }
}

module.exports = { LoginController }
