import { MESSAGES, SECONDARY_HEADER_BY_PAGE, SOCIAL_LINKS } from "../src/consts"
import { expect, test } from "../src/fixtures"

test.use({ storageState: "storage.json" })
for (const item of Object.values(SECONDARY_HEADER_BY_PAGE)) {

    test(`headers and foot elements at ${item.PAGE} page`, async ({ page }) => {
        const headerContainer = page.getByTestId("header-container")
        const primaryHeader = headerContainer.getByTestId("header-primary")
        const openMenuButton = primaryHeader.getByRole("button", { name: "Open Menu" })
        const cartLink = primaryHeader.getByTestId("link-cart")
        const secondaryHeader = headerContainer.getByTestId("header-secondary")
        const headerTitle = secondaryHeader.getByTestId("title")
        const backToProductsButton = secondaryHeader.getByTestId("button-back-to-products")
        const footer = page.getByTestId("footer")
        const twitter = footer.getByTestId("link-twitter")
        const facebook = footer.getByTestId("link-facebook")
        const linkedin = footer.getByTestId("link-linkedin")
        const copyrights = footer.getByTestId("text-copyrights")

        await page.goto(`.${item.PAGE}`)
        expect(page).toHaveURL(new RegExp(`.*${item.PAGE}`))

        // Primary Header
        await expect.soft(primaryHeader).toBeVisible()
        await expect.soft(openMenuButton).toBeVisible()
        await expect.soft(cartLink).toBeVisible()

        // Secondary Header
        if (page.url().match(/.*inventory-item.*/)) {
            await expect.soft(backToProductsButton).toHaveText(item.TITLE)
        } else {
            await expect.soft(headerTitle).toHaveText(item.TITLE)
        }

        // Footer
        await expect.soft(twitter).toHaveAttribute("href", SOCIAL_LINKS.TWITTER)
        await expect.soft(facebook).toHaveAttribute("href", SOCIAL_LINKS.FACEBOOK)
        await expect.soft(linkedin).toHaveAttribute("href", SOCIAL_LINKS.LINKEDIN)
        await expect.soft(copyrights).toHaveText(MESSAGES.COPYRIGHT)
    })
}
