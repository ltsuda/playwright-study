const { LoginComponents, loginLocators } = require('./components')

class LoginController {
  constructor(page) {
    this.page = page
    this.components = new LoginComponents(this.page)
    this.locators = loginLocators
    this.standardUser = 'standard_user'
    this.lockedUser = 'locked_out_user'
    this.problemUser = 'problem_user'
    this.performanceGlitchUser = 'performance_glitch_user'
    this.acceptedUsers = [this.standardUser, this.lockedUser, this.problemUser, this.performanceGlitchUser]
    this.password = 'secret_sauce'
  }

  async navigate() {
    await this.page.goto(process.env.SAUCE_LOGIN_URL || 'https://www.saucedemo.com/')
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

  async loginWithProblemUser() {
    await this._login(this.problemUser, this.password)
  }

  async loginWithPerformanceGlitchUser() {
    await this._login(this.performanceGlitchUser, this.password)
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
