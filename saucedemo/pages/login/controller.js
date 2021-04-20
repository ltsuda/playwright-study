const { LoginComponents, loginLocators } = require("./components")

class LoginController {
  constructor(page) {
    this.page = page
    this.components = new LoginComponents(this.page)
    this.locators = loginLocators
    this.standardUser = "standard_user"
    this.lockedUser = "locked_out_user"
    this.problemUser = "problem_user"
    this.performanceGlitchUser = "performance_glitch_user"
    this.acceptedUsers = [
      this.standardUser,
      this.lockedUser,
      this.problemUser,
      this.performanceGlitchUser,
    ]
    this.password = "secret_sauce"
  }

  async navigate() {
    await this.page.goto(
      process.env.SAUCE_LOGIN_URL || "https://www.saucedemo.com/"
    )
  }

  async fillUserName(username) {
    await this.page.fill(this.locators.username, username)
  }

  async fillPassword(password) {
    await this.page.fill(this.locators.password, password)
  }

  async clickLogin() {
    await this.page.click(this.locators.loginButton)
  }

  async login(username, password) {
    await this.fillUserName(username)
    await this.fillPassword(password)
    await this.clickLogin()
  }

  async loginWithStandardUser() {
    await this.login(this.standardUser, this.password)
  }

  async loginWithLockedUser() {
    await this.login(this.lockedUser, this.password)
  }

  async loginWithProblemUser() {
    await this.login(this.problemUser, this.password)
  }

  async loginWithPerformanceGlitchUser() {
    await this.login(this.performanceGlitchUser, this.password)
  }

  async loginWithoutUser() {
    await this.login("", this.password)
  }

  async loginWithWrongCredential() {
    await this.login("noname", this.password)
  }

  async getErrorMessage() {
    const errorElement = await this.components.errorMessage()
    return await errorElement.innerText()
  }

  async getAcceptedUsersFromPage() {
    let acceptedUsers = await this.components.acceptedUsers()
    acceptedUsers = await acceptedUsers.innerText()
    return acceptedUsers.split("\n").filter(Boolean).slice(1)
  }

  async getPasswordFromPage() {
    let acceptedPassword = await this.components.acceptedPassword()
    acceptedPassword = await acceptedPassword.innerText()
    return acceptedPassword.split("\n").filter(Boolean).slice(1).pop()
  }
}

module.exports = { LoginController }
