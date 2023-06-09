import { setSession } from '../src/common';
import { CREDENTIALS, PAGES } from '../src/consts';
import { expect, test } from '../src/fixtures';

test.describe('Inventory  Suite: @inventory-l', () => {
  test('should be at inventory page url', async ({ baseURL, inventoryPage }) => {
    await setSession(inventoryPage, { path: PAGES.INVENTORY, username: CREDENTIALS.USERS.STANDARD });
    await expect(inventoryPage.page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`);
  });
  test.fixme('should have a list of expected items', async () => {
    expect(true).toBeFalsy();
  });
  test.fixme('should increase cart badge', async () => {
    expect(true).toBeFalsy();
  });
  test.fixme('should decrease cart badge', async () => {
    expect(true).toBeFalsy();
  });
  test.fixme('should go to item details page', async () => {
    expect(true).toBeFalsy();
  });
  test.fixme('should show items sorted from A-Z', async () => {
    expect(true).toBeFalsy();
  });
  test.fixme('should sort items from Z-A', async () => {
    expect(true).toBeFalsy();
  });
  test.fixme('should sort items from A-Z', async () => {
    expect(true).toBeFalsy();
  });
  test.fixme('should sort items from low to high prices', async () => {
    expect(true).toBeFalsy();
  });
  test.fixme('should sort items from high to low prices', async () => {
    expect(true).toBeFalsy();
  });
});
