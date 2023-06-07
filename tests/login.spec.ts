import { CREDENTIALS, ERRORS, PAGES } from '../src/consts';
import { expect, test } from '../src/fixtures';

test.describe('Login Suite: @login', () => {
  test.beforeEach(async ({ loginPage, baseURL }) => {
    await loginPage.page.goto(baseURL ?? './');
  });
  test('should be at the login page', async ({ loginPage, baseURL }) => {
    expect(loginPage.page.url()).toEqual(`${baseURL}/`);
  });
  test('should show accepted users', async ({ loginPage }) => {
    const users = await loginPage.credentialsContainer.getAvailableUsernames();
    const expectedUsers = Object.values(CREDENTIALS.USERS);
    expect(users).toEqual(expectedUsers);
  });
  test("should show application's password ", async ({ loginPage }) => {
    const passwords = await loginPage.credentialsContainer.getAvailablePasswords();
    const expectedPasswords = new Array(CREDENTIALS.PASSWORD);
    expect(passwords).toEqual(expectedPasswords);
  });

  test('should show locked user error', async ({ loginPage }) => {
    await loginPage.loginContainer.usernameInput.fill(CREDENTIALS.USERS.LOCKED);
    await loginPage.loginContainer.passwordInput.fill(CREDENTIALS.PASSWORD);
    await loginPage.loginContainer.loginButton.click();
    await expect(loginPage.errorContainer.host).toBeVisible();
    await expect(loginPage.errorContainer.errorMessage).toHaveText(ERRORS.LOGIN_LOCKED);
  });
  test('should show username is required error', async ({ loginPage }) => {
    await loginPage.loginContainer.loginButton.click();
    await expect(loginPage.errorContainer.host).toBeVisible();
    await expect(loginPage.errorContainer.errorMessage).toHaveText(ERRORS.LOGIN_USER);
  });
  test("should show username and password doesn't match", async ({ loginPage }) => {
    await loginPage.loginContainer.usernameInput.fill(CREDENTIALS.USERS.LOCKED);
    await loginPage.loginContainer.passwordInput.fill('invalid');
    await loginPage.loginContainer.loginButton.click();
    await expect(loginPage.errorContainer.host).toBeVisible();
    await expect(loginPage.errorContainer.errorMessage).toHaveText(ERRORS.LOGIN_CREDENTIALS);
  });
  test('should navigate to inventory page after successful login', async ({ loginPage, inventoryPage }) => {
    await loginPage.loginWithUser(CREDENTIALS.USERS.STANDARD, CREDENTIALS.PASSWORD);
    await expect(inventoryPage.page).toHaveURL(PAGES.INVENTORY);
  });
});
