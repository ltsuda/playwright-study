const { LoginController } = require("../../saucedemo/pages/login/controller")

async function saveCookies(context) {
  await context.storageState({ path: "auth.json" })
}

async function loginAndSaveCookies(browser) {
  const context = await browser.newContext()
  const page = await context.newPage()
  const loginController = new LoginController(page)
  await loginController.navigate()
  await loginController.loginWithStandardUser()
  await saveCookies(context)
  await context.close()
}

function randomInt(max) {
  return Math.floor(Math.random() * max)
}

module.exports = {
  loginAndSaveCookies,
  saveCookies,
  randomInt,
}
