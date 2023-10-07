import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('./');

  const user = 'standard_user';
  const password = 'secret_sauce';

  // Login
  // const loginContainer = page.getByTestId("login-container")
  // await expect(loginContainer).toBeVisible()
  // const usernameInput = loginContainer.getByTestId("input-username")
  // await expect(usernameInput).toBeVisible()
  // const passwordInput = loginContainer.getByTestId("input-password")
  // await expect(passwordInput).toBeVisible()
  // const loginButton = loginContainer.getByTestId("button-login")
  // await expect(loginButton).toBeVisible()

  // Login Error
  // await usernameInput.fill(user)
  // await loginButton.click()
  // const errorContainer = loginContainer.locator(".error-message-container")
  // await expect(errorContainer).toBeVisible()
  // const errorMessage = errorContainer.getByTestId("error-text")
  // await expect(errorMessage).toBeVisible()
  // const closeErrorButton = errorContainer.getByTestId("button-close-error")
  // await expect(closeErrorButton).toBeVisible()
  // await closeErrorButton.click()

  // Login credentials
  // const credentialsContainer = loginContainer.getByTestId("login-credentials-container")
  // await expect(credentialsContainer).toBeVisible()
  // const userSection = credentialsContainer.getByTestId("section-usernames")
  // await expect(userSection).toBeVisible()
  // const passwordSection = credentialsContainer.getByTestId("section-password")
  // await expect(passwordSection).toBeVisible()

  // await usernameInput.fill(user)
  // await passwordInput.fill(password)
  // await loginButton.click()

  // Header container
  const headerContainer = page.getByTestId('header-container');
  await expect(headerContainer).toBeVisible();

  // Header primary
  const primaryHeader = headerContainer.getByTestId('header-primary');
  await expect(primaryHeader).toBeVisible();
  const openMenuButton = primaryHeader.getByRole('button', { name: 'Open Menu' });
  await expect(openMenuButton).toBeVisible();
  await openMenuButton.click();
  // Side menu
  const sideMenu = primaryHeader.locator('.bm-menu-wrap');
  await expect(sideMenu).toBeVisible();
  const allItemsButton = sideMenu.getByTestId('link-all-items');
  await expect(allItemsButton).toBeVisible();
  const aboutButton = sideMenu.getByTestId('link-about');
  await expect(aboutButton).toBeVisible();
  const logoutButton = sideMenu.getByTestId('link-logout');
  await expect(logoutButton).toBeVisible();
  const resetAppButton = sideMenu.getByTestId('link-reset-state');
  await expect(resetAppButton).toBeVisible();
  const closeMenuButton = sideMenu.getByRole('button', { name: 'Close Menu' });
  await expect(closeMenuButton).toBeVisible();
  await closeMenuButton.click();
  await expect(sideMenu).not.toBeVisible();

  // Cart link
  const cartLink = primaryHeader.getByTestId('link-cart');
  await expect(cartLink).toBeVisible();
  const cartBadge = cartLink.getByTestId('cart-badge');
  await expect(cartBadge).not.toBeVisible();

  // Header Secondary
  const secondaryHeader = headerContainer.getByTestId('header-secondary');
  await expect(secondaryHeader).toBeVisible();
  // const headerTitle = secondaryHeader.getByTestId("title")
  // await expect(headerTitle).toBeVisible()
  // Sort items menu
  const sortContainer = secondaryHeader.locator('.select_container');
  await expect(sortContainer).toBeVisible();
  const sortItemsMenu = sortContainer.getByTestId('select-sort-items');
  await expect(sortItemsMenu).toBeVisible();
  const activeSortOption = sortContainer.getByTestId('select-active-option');
  await sortItemsMenu.selectOption('lohi');
  await expect(activeSortOption).toHaveText('Price (low to high)');

  // Product Container
  const inventoryContainer = page.getByTestId('inventory-container');
  await expect(inventoryContainer).toBeVisible();
  const inventoryList = inventoryContainer.getByTestId('list-inventory');
  await expect(inventoryList).toBeVisible();
  const inventoryItem = inventoryList.getByTestId('inventory-item');
  await expect(inventoryItem.nth(0)).toBeVisible();
  const itemImage = inventoryItem.getByTestId(/img-*/i);
  await expect(itemImage.nth(0)).toBeVisible();
  const itemDescriptionContainer = inventoryItem.nth(0).getByTestId('item-description-container');
  await expect(itemDescriptionContainer.nth(0)).toBeVisible();
  const itemName = itemDescriptionContainer.nth(0).getByTestId('item-name');
  await expect(itemName).toBeVisible();
  const itemDescription = itemDescriptionContainer.nth(0).getByTestId('item-description');
  await expect(itemDescription).toBeVisible();
  const itemPrice = itemDescriptionContainer.nth(0).getByTestId('item-price');
  await expect(itemPrice).toBeVisible();
  const addItemToCart = itemDescriptionContainer.nth(0).getByTestId(/button-add-to-cart-*/);
  await expect(addItemToCart).toBeVisible();

  // Footer
  // const footer = page.getByTestId("footer")
  // await expect(footer).toBeVisible()
  // const twitter = footer.getByTestId("link-twitter")
  // await expect(twitter).toBeVisible()
  // const facebook = footer.getByTestId("link-facebook")
  // await expect(facebook).toBeVisible()
  // const linkedin = footer.getByTestId("link-linkedin")
  // await expect(linkedin).toBeVisible()
  // const copyrights = footer.getByTestId("text-copyrights")
  // await expect(copyrights).toBeVisible()

  // Enter item
  await itemName.click();
  await expect(primaryHeader).toBeVisible();
  const backButton = secondaryHeader.getByTestId('button-back-to-products');
  await expect(backButton).toBeVisible();
  const inventoryDetailsContainer = page.getByTestId('inventory-details-container');
  await expect(inventoryDetailsContainer).toBeVisible();
  const detailItem = inventoryDetailsContainer.getByTestId('inventory-item');
  await expect(detailItem).toBeVisible();
  const detailImage = detailItem.getByTestId(/img-*/i);
  await expect(detailImage).toBeVisible();
  const detailDescriptionContainer = detailItem.locator('.inventory_details_desc_container');
  await expect(detailDescriptionContainer).toBeVisible();
  const detailName = detailDescriptionContainer.getByTestId('item-name');
  await expect(detailName).toBeVisible();
  const detailDescription = detailDescriptionContainer.getByTestId('item-description');
  await expect(detailDescription).toBeVisible();
  const detailPrice = detailDescriptionContainer.getByTestId('item-price');
  await expect(detailPrice).toBeVisible();
  const addToCart = detailDescriptionContainer.getByTestId('button-add-to-cart');
  await expect(addToCart).toBeVisible();
  await addToCart.click();
  await expect(cartBadge).toBeVisible();
  const removeItem = detailDescriptionContainer.getByTestId('button-remove');
  await expect(removeItem).toBeVisible();

  // Cart
  await cartLink.click();
  await expect(primaryHeader).toBeVisible();
  const cartContainer = page.getByTestId('cart-container');
  await expect(cartContainer).toBeVisible();
  const cartList = cartContainer.getByTestId('list-cart');
  await expect(cartList).toBeVisible();
  const cartItem = cartContainer.getByTestId('inventory-item');
  await expect(cartItem).toBeVisible();
  const itemQty = cartItem.getByTestId('item-quantity');
  await expect(itemQty).toHaveText('1');
  const cartItemName = cartItem.getByTestId('item-name');
  await expect(cartItemName).toBeVisible();
  const cartItemDescription = cartItem.getByTestId('item-description');
  await expect(cartItemDescription).toBeVisible();
  const cartItemPrice = cartItem.getByTestId('item-price');
  await expect(cartItemPrice).toBeVisible();
  const cartItemRemove = cartItem.getByTestId(/button-remove-*/);
  await expect(cartItemRemove).toBeVisible();
  const continueShoppingButton = page.getByTestId('button-continue-shopping');
  await expect(continueShoppingButton).toBeVisible();
  const checkoutButton = page.getByTestId('button-checkout');
  await expect(checkoutButton).toBeVisible();

  // Checkout
  await checkoutButton.click();
  await expect(primaryHeader).toBeVisible();
  const firstNameInput = page.getByTestId('input-first-name');
  await expect(firstNameInput).toBeVisible();
  const lastNameInput = page.getByTestId('input-last-name');
  await expect(lastNameInput).toBeVisible();
  const zipcodeInput = page.getByTestId('input-postal-code');
  await expect(zipcodeInput).toBeVisible();
  await firstNameInput.fill('john');
  await zipcodeInput.fill('doe');
  await lastNameInput.fill('ABC123');
  const cancelButton = page.getByTestId('button-cancel');
  await expect(cancelButton).toBeVisible();
  const continueButton = page.getByTestId('button-continue');
  await expect(continueButton).toBeVisible();

  // Review
  await continueButton.click();
  await expect(primaryHeader).toBeVisible();
  const reviewList = page.getByTestId('list-cart');
  await expect(reviewList).toBeVisible();
  const reviewItem = reviewList.getByTestId('inventory-item');
  await expect(reviewItem).toBeVisible();
  const reviewQty = reviewItem.getByTestId('item-quantity');
  await expect(reviewQty).toHaveText('1');
  const reviewItemName = reviewItem.getByTestId('item-name');
  await expect(reviewItemName).toBeVisible();
  const reviewItemDescription = reviewItem.getByTestId('item-description');
  await expect(reviewItemDescription).toBeVisible();
  const reviewItemPrice = reviewItem.getByTestId('item-price');
  await expect(reviewItemPrice).toBeVisible();

  const summaryContainer = page.locator('.summary_info');
  await expect(summaryContainer).toBeVisible();
  const paymentLabel = summaryContainer.getByTestId('label-payment-information');
  await expect(paymentLabel).toBeVisible();
  const paymentValue = summaryContainer.getByTestId('value-payment-information');
  await expect(paymentValue).toBeVisible();
  const shippingLabel = summaryContainer.getByTestId('label-shipping-information');
  await expect(shippingLabel).toBeVisible();
  const shippingValue = summaryContainer.getByTestId('value-shipping-information');
  await expect(shippingValue).toBeVisible();
  const subtotalValue = summaryContainer.getByTestId('value-subtotal');
  await expect(subtotalValue).toBeVisible();
  const taxValue = summaryContainer.getByTestId('label-tax');
  await expect(taxValue).toBeVisible();
  const totalValue = summaryContainer.getByTestId('label-total');
  await expect(totalValue).toBeVisible();

  await expect(cancelButton).toBeVisible();
  const finishButton = page.getByTestId('button-finish');
  await expect(finishButton).toBeVisible();

  // Finished
  await finishButton.click();
  await expect(primaryHeader).toBeVisible();

  // const completeContainer = page.getByTestId("checkout-complete-container")
  // await expect(completeContainer).toBeVisible()
  // const completeImage = completeContainer.getByTestId("img-pony-express")
  // await expect(completeImage).toBeVisible()
  // const completeHeader = completeContainer.getByTestId("header-complete")
  // await expect(completeHeader).toBeVisible()
  // const completeDescription = completeContainer.getByTestId("header-description")
  // await expect(completeDescription).toBeVisible()
  // const backHomeButton = completeContainer.getByTestId("button-back-to-products")
  // await expect(backHomeButton).toBeVisible()
});
