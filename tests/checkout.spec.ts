import { setSession } from '../src/common';
import { CREDENTIALS, ERRORS, PAGES } from '../src/consts';
import { expect, test } from '../src/fixtures';

test.describe('Checkout Suite: @checkout', () => {
  test('should be at checkout page url', async ({ baseURL, checkoutPage }) => {
    await setSession(checkoutPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    await expect(checkoutPage.page).toHaveURL(`${baseURL}${PAGES.CHECKOUT}`);
  });
  test("should be have information field's placeholder", async ({ checkoutPage }) => {
    await setSession(checkoutPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    const firstNamePlaceholderLocator = checkoutPage.checkoutContainer.firstNameInput.and(
      checkoutPage.page.getByPlaceholder('First Name')
    );
    const lastNamePlaceholderLocator = checkoutPage.checkoutContainer.lastNameInput.and(
      checkoutPage.page.getByPlaceholder('Last Name')
    );
    const zipcodePlaceholderLocator = checkoutPage.checkoutContainer.zipcodeInput.and(
      checkoutPage.page.getByPlaceholder('Zip/Postal Code')
    );

    await expect(firstNamePlaceholderLocator).toBeVisible();
    await expect(lastNamePlaceholderLocator).toBeVisible();
    await expect(zipcodePlaceholderLocator).toBeVisible();
  });
  test('should show first name error is required', async ({ checkoutPage }) => {
    await setSession(checkoutPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorContainer.host).toBeVisible();
    await expect(checkoutPage.errorContainer.errorMessage).toHaveText(ERRORS.PERSONAL_FIRSTNAME);
  });
  test('should show last name error is required', async ({ checkoutPage }) => {
    await setSession(checkoutPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    await checkoutPage.checkoutContainer.firstNameInput.fill('John');
    await checkoutPage.checkoutContainer.firstNameInput.fill('John');
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorContainer.host).toBeVisible();
    await expect(checkoutPage.errorContainer.errorMessage).toHaveText(ERRORS.PERSONAL_LASTNAME);
  });
  test('should show postal code error is required', async ({ checkoutPage }) => {
    await setSession(checkoutPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    await checkoutPage.checkoutContainer.firstNameInput.fill('John');
    await checkoutPage.checkoutContainer.lastNameInput.fill('Doe');
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorContainer.host).toBeVisible();
    await expect(checkoutPage.errorContainer.errorMessage).toHaveText(ERRORS.PERSONAL_ZIP);
  });
  test('should be at cart page if cancel checkout', async ({ baseURL, checkoutPage, cartPage }) => {
    await setSession(checkoutPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    await checkoutPage.cancelButton.click();
    await expect(cartPage.page).toHaveURL(`${baseURL}${PAGES.CART}`);
  });
});
