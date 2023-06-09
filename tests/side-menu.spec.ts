import { setSession } from '../src/common';
import { expect, test } from '../src/fixtures';
import { CREDENTIALS, PAGES } from '../src/consts';

test.describe('Side Menu Suite: @side-menu', () => {
  test('should open side menu', async ({ cartPage }) => {
    await setSession(cartPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    await cartPage.primaryHeader.openSideMenu();
    await expect(cartPage.primaryHeader.sideMenu.host).toBeVisible();
  });
  test('should close side menu', async ({ cartPage }) => {
    await setSession(cartPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    await cartPage.primaryHeader.openSideMenu();
    await cartPage.primaryHeader.sideMenu.close();
    await expect(cartPage.primaryHeader.sideMenu.host).toBeHidden();
  });
  test('should navigate back to inventory list page', async ({ baseURL, cartPage, inventoryPage }) => {
    await setSession(cartPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    await cartPage.primaryHeader.openSideMenu();
    await cartPage.primaryHeader.sideMenu.allItemLink.click();
    await expect(inventoryPage.page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`);
  });
  test('should have saucelabs link in about menu item', async ({ cartPage }) => {
    await setSession(cartPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    await cartPage.primaryHeader.openSideMenu();
    await expect(cartPage.primaryHeader.sideMenu.aboutLink).toHaveAttribute('href', 'https://saucelabs.com/');
  });
  test('should logout from application', async ({ baseURL, cartPage, loginPage }) => {
    await setSession(cartPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    await cartPage.primaryHeader.openSideMenu();
    await cartPage.primaryHeader.sideMenu.logout();
    await expect(loginPage.page).toHaveURL(`${baseURL}/`);
  });
  test('should reset cart badge', async ({ cartPage }) => {
    await setSession(cartPage, { path: PAGES.CHECKOUT, username: CREDENTIALS.USERS.STANDARD });
    expect(true).toBeFalsy();
  });
});
