import { Footer } from '../src/components/footer';
import { PrimaryHeader } from '../src/components/primary-header';
import { SecondaryHeader } from '../src/components/secondary-header';
import { MESSAGES, SECONDARY_HEADER_BY_PAGE, SOCIAL_LINKS } from '../src/consts';
import { expect, test } from '../src/fixtures';

test.use({ storageState: 'storage.json' });
for (const item of Object.values(SECONDARY_HEADER_BY_PAGE)) {
  test(`headers and foot elements at ${item.PAGE} page`, async ({ page }) => {
    const headerContainerLocator = page.getByTestId('header-container');
    const primaryHeaderLocator = headerContainerLocator.getByTestId('header-primary');
    const secondaryHeaderLocator = headerContainerLocator.getByTestId('header-secondary');
    const primaryHeader = new PrimaryHeader(primaryHeaderLocator);
    const secondaryHeader = new SecondaryHeader(secondaryHeaderLocator);
    const footer = new Footer(page.getByTestId('footer'));

    await page.goto(`.${item.PAGE}`);
    await expect(page).toHaveURL(new RegExp(`.*${item.PAGE}`));

    // Primary Header
    await expect.soft(primaryHeader.host).toBeVisible();
    await expect.soft(primaryHeader.sideMenu.openButton).toBeVisible();
    await expect.soft(primaryHeader.cart.cartLink).toBeVisible();
    await expect.soft(primaryHeader.appLogo).toBeVisible();

    // Secondary Header
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (page.url().match(/.*inventory-item.*/)) {
      await expect.soft(secondaryHeader.backToProductsButton).toHaveText(item.TITLE);
    } else {
      await expect.soft(secondaryHeader.title).toHaveText(item.TITLE);
    }

    // Footer
    await expect.soft(footer.twitterLink).toHaveAttribute('href', SOCIAL_LINKS.TWITTER);
    await expect.soft(footer.facebookLink).toHaveAttribute('href', SOCIAL_LINKS.FACEBOOK);
    await expect.soft(footer.linkedInLink).toHaveAttribute('href', SOCIAL_LINKS.LINKEDIN);
    await expect.soft(footer.copyrightText).toHaveText(MESSAGES.COPYRIGHT);
  });
}
