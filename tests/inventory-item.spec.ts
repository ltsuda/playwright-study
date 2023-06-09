import { setSession } from '../src/common';
import { CREDENTIALS, PAGES } from '../src/consts';
import { expect, test } from '../src/fixtures';

test.describe('Inventory Item Suite: @inventory-item', () => {
  let randomItemId: number;

  test.beforeEach(async () => {
    randomItemId = Math.floor(Math.random() * 6);
  });

  test('should have item id at url', async ({ baseURL, inventoryItemPage }) => {
    await setSession(inventoryItemPage, {
      path: PAGES.INVENTORY_ITEM,
      username: CREDENTIALS.USERS.STANDARD,
      productsIndex: [randomItemId],
    });
    await expect(inventoryItemPage.page).toHaveURL(`${baseURL}${PAGES.INVENTORY_ITEM}?id=${randomItemId}`);
  });
  test('should have item details', async () => {
    expect(true).toBeFalsy();
  });
  test('should add item to cart', async () => {
    expect(true).toBeFalsy();
  });
  test('should remove item from cart', async () => {
    expect(true).toBeFalsy();
  });
  test('should be at inventory page if click at back to products', async ({
    baseURL,
    inventoryPage,
    inventoryItemPage,
  }) => {
    await setSession(inventoryItemPage, {
      path: PAGES.INVENTORY_ITEM,
      username: CREDENTIALS.USERS.STANDARD,
      productsIndex: [randomItemId],
    });
    await inventoryItemPage.secondaryHeader.backToProductsButton.click();
    await expect(inventoryPage.page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`);
  });
});
