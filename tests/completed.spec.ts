import { setSession } from '../src/common';
import { CREDENTIALS, IMAGES, MESSAGES, PAGES } from '../src/consts';
import { expect, test } from '../src/fixtures';

test.describe('Completed Suite: @completed', () => {
  test.beforeEach(async ({ completedPage }) => {
    await setSession(completedPage, {
      path: PAGES.COMPLETED,
      username: CREDENTIALS.USERS.STANDARD,
    });
  });
  test('should be at completed page url', async ({ completedPage, baseURL }) => {
    expect(completedPage.page.url()).toEqual(`${baseURL}${PAGES.COMPLETED}`);
  });
  test('should have thank you messages and image', async ({ completedPage }) => {
    await expect.soft(completedPage.thankyouContainer.ponyExpressImage).toHaveAttribute('alt', 'Pony Express');
    await expect.soft(completedPage.thankyouContainer.ponyExpressImage).toHaveAttribute('src', IMAGES.PONY_EXPRESS);
    await expect.soft(completedPage.thankyouContainer.thankyouMessage).toHaveText(MESSAGES.COMPLETED_THANKS);
    await expect.soft(completedPage.thankyouContainer.thankyouDescription).toHaveText(MESSAGES.COMPLETED_DISPATCH);
    await expect.soft(completedPage.thankyouContainer.backHomeButton).toBeEnabled();
  });
});
