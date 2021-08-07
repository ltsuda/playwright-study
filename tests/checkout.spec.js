const { test, expect } = require('@playwright/test')
const { CheckoutController } = require('../saucedemo/pages/checkout/controller')
const { PAGES, PERSONAL_INFO, ERRORS, CREDENTIALS } = require('../saucedemo/utils/consts')
const { setSession } = require('../saucedemo/utils/utils')

test.describe('Saucedemo CheckoutPage: @checkout', () => {
  test.beforeEach(async ({ page }) => {
    checkoutController = new CheckoutController(page)
  })

  test('should be at Checkout page', async ({ page }) => {
    await setSession(page, {
      path: PAGES.CHECKOUT,
      username: CREDENTIALS.USERS.STANDARD,
    })
    expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.CHECKOUT}`)
  })

  test('should go back to Cart if cancel checkout', async ({ page }) => {
    await setSession(page, {
      path: PAGES.CHECKOUT,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await checkoutController.cancelCheckout()
    expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.CART}`)
  })

  test('should show firstName error message if empty', async ({ page }) => {
    await setSession(page, {
      path: PAGES.CHECKOUT,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await checkoutController.continueCheckout()
    expect(await checkoutController.getErrorMessage()).toBe(ERRORS.PERSONAL_FIRSTNAME)
  })

  test('should show lastName error message if empty', async ({ page }) => {
    await setSession(page, {
      path: PAGES.CHECKOUT,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await checkoutController.fillFirstName(PERSONAL_INFO.USER1.FIRST_NAME)
    await checkoutController.continueCheckout()
    expect(await checkoutController.getErrorMessage()).toBe(ERRORS.PERSONAL_LASTNAME)
  })

  test('should show postalCode error message if empty', async ({ page }) => {
    await setSession(page, {
      path: PAGES.CHECKOUT,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await checkoutController.fillFirstName(PERSONAL_INFO.USER1.FIRST_NAME)
    await checkoutController.fillLastName(PERSONAL_INFO.USER1.LAST_NAME)
    await checkoutController.continueCheckout()
    expect(await checkoutController.getErrorMessage()).toBe(ERRORS.PERSONAL_ZIP)
  })

  test('should go to Checkout Overview page', async ({ page }) => {
    await setSession(page, {
      path: PAGES.CHECKOUT,
      username: CREDENTIALS.USERS.STANDARD,
    })
    await checkoutController.fillFirstName(PERSONAL_INFO.USER1.FIRST_NAME)
    await checkoutController.fillLastName(PERSONAL_INFO.USER1.LAST_NAME)
    await checkoutController.fillPostalCode(PERSONAL_INFO.USER1.ZIP)
    await checkoutController.continueCheckout()
    expect(page.url()).toBe(`${PAGES.BASEURL}${PAGES.OVERVIEW}`)
  })
})
