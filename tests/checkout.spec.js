const { expect } = require("@playwright/test")
const test = require("../saucedemo/pages/pageFixtures")
const { PAGES, PERSONAL_INFO, ERRORS, CREDENTIALS } = require("../saucedemo/utils/consts")
const { setSession } = require("../saucedemo/utils/utils")

test.describe.parallel("Saucedemo CheckoutPage: @checkout", () => {
    test("should be at Checkout page", async ({ baseURL, page }) => {
        await setSession(page, {
            path: PAGES.CHECKOUT,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await expect(page).toHaveURL(`${baseURL}${PAGES.CHECKOUT}`)
    })

    test("should go back to Cart if cancel checkout", async ({ baseURL, checkoutController, page }) => {
        await setSession(page, {
            path: PAGES.CHECKOUT,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await checkoutController.cancelCheckout()
        await expect(page).toHaveURL(`${baseURL}${PAGES.CART}`)
    })

    test("should show firstName error message if empty", async ({ checkoutController, page }) => {
        await setSession(page, {
            path: PAGES.CHECKOUT,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await checkoutController.continueCheckout()
        await expect(await checkoutController.components.errorMessageText()).toHaveText(ERRORS.PERSONAL_FIRSTNAME)
    })

    test("should show lastName error message if empty", async ({ checkoutController, page }) => {
        await setSession(page, {
            path: PAGES.CHECKOUT,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await checkoutController.fillFirstName(PERSONAL_INFO.USER1.FIRST_NAME)
        await checkoutController.continueCheckout()
        await expect(await checkoutController.components.errorMessageText()).toHaveText(ERRORS.PERSONAL_LASTNAME)
    })

    test("should show postalCode error message if empty", async ({ checkoutController, page }) => {
        await setSession(page, {
            path: PAGES.CHECKOUT,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await checkoutController.fillFirstName(PERSONAL_INFO.USER1.FIRST_NAME)
        await checkoutController.fillLastName(PERSONAL_INFO.USER1.LAST_NAME)
        await checkoutController.continueCheckout()
        await expect(await checkoutController.components.errorMessageText()).toHaveText(ERRORS.PERSONAL_ZIP)
    })

    test("should go to Checkout Overview page @smoke", async ({ baseURL, checkoutController, page }) => {
        await setSession(page, {
            path: PAGES.CHECKOUT,
            username: CREDENTIALS.USERS.STANDARD,
        })
        await checkoutController.fillFirstName(PERSONAL_INFO.USER1.FIRST_NAME)
        await checkoutController.fillLastName(PERSONAL_INFO.USER1.LAST_NAME)
        await checkoutController.fillPostalCode(PERSONAL_INFO.USER1.ZIP)
        await checkoutController.continueCheckout()
        await expect(page).toHaveURL(`${baseURL}${PAGES.OVERVIEW}`)
    })
})
