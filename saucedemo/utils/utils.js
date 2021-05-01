const fs = require("fs")
const { LoginController } = require("../../saucedemo/pages/login/controller")

async function saveCookies(context) {
  const cookies = await context.cookies()
  const cookieJson = JSON.stringify(cookies)
  fs.writeFileSync("cookies.json", cookieJson)
}

async function loadCookies(context) {
  const cookies = fs.readFileSync("cookies.json", "utf8")
  const deserializedCookies = JSON.parse(cookies)
  await context.addCookies(deserializedCookies)
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
  loadCookies,
  randomInt,
}
