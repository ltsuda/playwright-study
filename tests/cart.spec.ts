import { setSession } from '../src/common';
import { CREDENTIALS, PAGES } from '../src/consts';
import { expect, test } from '../src/fixtures';

test.describe('Cart Suite: @cart', () => {
  test('should be at cart page url', async ({ baseURL, cartPage }) => {
    await setSession(cartPage, { path: PAGES.CART, username: CREDENTIALS.USERS.STANDARD });
    await expect(cartPage.page).toHaveURL(`${baseURL}${PAGES.CART}`);
  });
  test('should be at inventory if continue shopping', async ({ baseURL, cartPage, inventoryPage }) => {
    await setSession(cartPage, { path: PAGES.CART, username: CREDENTIALS.USERS.STANDARD });
    await cartPage.continueShoppingButton.click();
    await expect(inventoryPage.page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`);
  });
  test.fixme("should have items' details", async () => {
    expect(true).toBeFalsy();
  });
  test.fixme('should remove item from cart', async () => {
    expect(true).toBeFalsy();
  });
});
