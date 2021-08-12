const { PAGES } = require("./consts")

function randomInt(max) {
    return Math.floor(Math.random() * max)
}

async function setSession(page, data = {}) {
    const { BASEURL } = PAGES
    const { path, products = [], username = "" } = data
    const productsContent = products.length > 0 ? JSON.stringify(products) : "[]"

    await page.goto(BASEURL, "networkidle")

    await page.evaluate(
        ([ username, productsContent ]) => {
            const cookie = `session-username=${username}`
            const storage = [ "cart-contents", productsContent ]
            /* eslint-disable no-undef */
            document.cookie = cookie
            window.localStorage.setItem(...storage)
            /* eslint-enable no-undef */
        },
        [ username, productsContent ]
    )
    await page.goto(`${path}`, "networkidle")
}

module.exports = {
    randomInt,
    setSession,
}
