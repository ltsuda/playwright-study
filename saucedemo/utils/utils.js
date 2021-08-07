const { PAGES } = require('./consts')

function randomInt(max) {
  return Math.floor(Math.random() * max)
}

async function setSession(page, data = {}) {
  const { BASEURL } = PAGES
  const { path, products = [], username = '' } = data
  const productsContent = products.length > 0 ? JSON.stringify(products) : '[]'

  await page.goto(BASEURL, 'networkidle')

  await page.evaluate(
    ([username, productsContent]) => {
      document.cookie = `session-username=${username}`
      window.localStorage.setItem('cart-contents', productsContent)
    },
    [username, productsContent]
  )
  await page.goto(`${BASEURL}${path}`, 'networkidle')
}

module.exports = {
  randomInt,
  setSession,
}
