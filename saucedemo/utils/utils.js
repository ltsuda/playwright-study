const fs = require("fs")

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

module.exports = {
  saveCookies,
  loadCookies,
}
