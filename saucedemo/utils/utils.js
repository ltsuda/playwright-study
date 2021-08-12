/* eslint-disable no-unused-vars */
const { Page } = require("@playwright/test")
/* eslint-enable no-unused-vars */
const { PAGES } = require("./consts")

/**
 * Choose a random integer between 0 and @max
 * @param {number} max - the high limit for the random number
 * @returns {number} the random number generated
 */
function randomInt(max) {
    return Math.floor(Math.random() * max)
}

/**
 * Set browser's cookies and localStore directly using the document object
 * and navigate to the destination URL path
 * @param {Page} page - playwright browser's page\
 * See {@link https://playwright.dev/docs/api/class-page}
 * @param {Object} data - data comming from test suite or test cases
 * @param {String} data.path - url destination path
 * @param {number[]} [data.products=[]] - list of products index
 * @param {String} data.username - username credentials to authenticate on website
 */
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
