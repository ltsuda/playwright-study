const { LoginController } = require('../../saucedemo/pages/login/controller')

async function saveCookies(context, timestamp) {
  await context.storageState({ path: `output/auth_${timestamp}.json` })
}

async function loginAndSaveCookies(browser) {
  const context = await browser.newContext()
  const page = await context.newPage()
  const loginController = new LoginController(page)
  await loginController.navigate()
  await loginController.loginWithStandardUser()
  const timestamp = Date.now()
  await saveCookies(context, timestamp)
  await context.close()

  return timestamp
}

function randomInt(max) {
  return Math.floor(Math.random() * max)
}

module.exports = {
  loginAndSaveCookies,
  saveCookies,
  randomInt,
}
