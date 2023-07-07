import { setSession } from '../src/common';
import { CREDENTIALS, PAGES, PRODUCTS } from '../src/consts';
import { expect, test } from '../src/fixtures';

test.describe('Review Purchase Suite: @review', () => {
  const products = [PRODUCTS.ALL_TSHIRT.index, PRODUCTS.BOLT_TSHIRT.index].reduce(
    (productsIndexAsInt: number[], productIndex) => {
      productsIndexAsInt.push(parseInt(productIndex, 10));
      return productsIndexAsInt;
    },
    [],
  );

  test('should be at review item page url', async ({ baseURL, reviewPage }) => {
    await setSession(reviewPage, { path: PAGES.OVERVIEW, username: CREDENTIALS.USERS.STANDARD });
    await expect(reviewPage.page).toHaveURL(`${baseURL}${PAGES.OVERVIEW}`);
  });
  test.fixme("should have items' details", async () => {
    expect(true).toBeFalsy();
  });
  test('should have payment information', async ({ reviewPage }) => {
    await setSession(reviewPage, { path: PAGES.OVERVIEW, username: CREDENTIALS.USERS.STANDARD });
    await expect(reviewPage.paymentLabel).toHaveText(/Payment Information/);
    await expect(reviewPage.paymentValue).toHaveText('SauceCard #31337');
  });
  test('should have shipping information', async ({ reviewPage }) => {
    await setSession(reviewPage, { path: PAGES.OVERVIEW, username: CREDENTIALS.USERS.STANDARD });
    await expect(reviewPage.shippingLabel).toHaveText(/Shipping Information/);
    await expect(reviewPage.shippingValue).toHaveText('Free Pony Express Delivery!');
  });
  test.fixme('should have sum of item prices', async ({ reviewPage }) => {
    await setSession(reviewPage, {
      path: PAGES.OVERVIEW,
      username: CREDENTIALS.USERS.STANDARD,
      productsIndex: products,
    });
    expect(true).toBeFalsy();
  });
  test.fixme('should have tax value (8%) item total', async () => {
    expect(true).toBeFalsy();
  });
  test.fixme('should have total value with tax', async () => {
    expect(true).toBeFalsy();
  });
  test('should be at inventory page if cancel purchase', async ({ baseURL, reviewPage, inventoryPage }) => {
    await setSession(reviewPage, { path: PAGES.OVERVIEW, username: CREDENTIALS.USERS.STANDARD });
    await reviewPage.cancelButton.click();
    await expect(inventoryPage.page).toHaveURL(`${baseURL}${PAGES.INVENTORY}`);
  });
});
