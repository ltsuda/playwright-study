const loginLocators = require("../resources/locators/loginLocators")

class LoginPage {
  constructor(page) {
    this.page = page
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
    this.password = ["secret_sauce"]
  }

  async navigate() {
    await this.page.goto(
      process.env.SAUCE_LOGIN_URL || "https://www.saucedemo.com/"
    )
  }

  async loginWithStandardUser() {
    await this.login(this.standardUser, this.password.pop())
  }

  async loginWithLockedUser() {
    await this.login(this.lockedUser, this.password.pop())
  }

  async loginWithProblemUser() {
    await this.login(this.problemUser, this.password.pop())
  }

  async loginWithPerformanceGlitchUser() {
    await this.login(this.performanceGlitchUser, this.password.pop())
  }

  async loginWithoutUser() {
    await this.login("", this.password.pop())
  }

  async loginWithWrongCredentials() {
    await this.login("noname", this.password.pop())
  }

  async login(user = this.standardUser, password = this.password.pop()) {
    await this.page.fill(loginLocators.USERNAME, user)
    await this.page.fill(loginLocators.PASSWORD, password)
    await this.page.click(loginLocators.BTN_LOGIN)
  }

  async getAcceptedUsersFromPage() {
    let acceptedUsers = await this.page.innerText(
      loginLocators.ACCEPTED_USERNAMES
    )
    return acceptedUsers.split("\n").filter(Boolean).slice(1)
  }

  async getPasswordFromPage() {
    let password = await this.page.innerText(loginLocators.ACCEPTED_PASSWORD)
    return password.split("\n").filter(Boolean).slice(1)
  }

  async getErrorFromPage() {
    return await this.page.innerText(loginLocators.ERROR)
  }
}

module.exports = { LoginPage }
