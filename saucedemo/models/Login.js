const constants = require("../resources/locators/loginLocators")

class LoginPage {
  constructor(page) {
    this.page = page
    this.acceptedUsers = [
      "standard_user",
      "locked_out_user",
      "problem_user",
      "performance_glitch_user",
    ]
    this.password = ["secret_sauce"]
  }

  async navigate() {
    await this.page.goto(
      process.env.SAUCE_LOGIN_URL || "https://www.saucedemo.com/"
    )
  }

  async getAcceptedUsersFromPage() {
    let acceptedUsers = await this.page.innerText(constants.ACCEPTED_USERNAMES)
    return acceptedUsers.split("\n").filter(Boolean).slice(1)
  }

  async getPasswordFromPage() {
    let password = await this.page.innerText(constants.ACCEPTED_PASSWORD)
    return password.split("\n").filter(Boolean).slice(1)
  }
}

module.exports = { LoginPage }
