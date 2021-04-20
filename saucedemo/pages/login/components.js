const loginLocators = {
  username: "[data-test='username']",
  password: "[data-test='password']",
  error: "[data-test='error']",
  loginButton: "[id='login-button']",
  acceptedUsers: "[id='login_credentials']",
  acceptedPassword: "[class='login_password']",
}

class LoginComponents {
  constructor(page) {
    this.page = page
  }

  async acceptedUsers() {
    return await this.page.$(loginLocators.acceptedUsers)
  }

  async acceptedPassword() {
    return await this.page.$(loginLocators.acceptedPassword)
  }

  async errorMessage() {
    return await this.page.$(loginLocators.error)
  }
}

module.exports = {
  LoginComponents,
  loginLocators,
}
