import { CartPage } from './pages/cart';
import { CheckoutPage } from './pages/checkout';
import { CompletedPage } from './pages/completed';
import { InventoryPage } from './pages/inventory';
import { InventoryItemPage } from './pages/inventory-item';
import { LoginPage } from './pages/login';
import { ReviewPage } from './pages/review';

export type DemoPages = {
  loginPage: LoginPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  completedPage: CompletedPage;
  inventoryItemPage: InventoryItemPage;
  inventoryPage: InventoryPage;
  reviewPage: ReviewPage;
};

type MyPages<T> = T[keyof T];

type SessionData = {
  path: string;
  productsIndex?: string[];
  username: string;
};

export async function setSession(targetPage: MyPages<DemoPages>, data: SessionData): Promise<void> {
  const { path, productsIndex = [], username = '' } = data;
  const productsContent = productsIndex.length > 0 ? JSON.stringify(productsIndex) : '[]';

  await targetPage.page.goto('/');

  await targetPage.page.evaluate(
    ([username, productsContent]) => {
      const cookie = `session-username=${username}`;
      document.cookie = cookie;
      window.localStorage.setItem('cart-contents', productsContent);
    },
    [username, productsContent]
  );
  await targetPage.page.goto(path);
}
