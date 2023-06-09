import { Page } from '../abstracts';

export class CartPage extends Page {
  public readonly continueShoppingButton = this.page.getByTestId('button-continue-shopping');
  public readonly checkoutButton = this.page.getByTestId('button-checkout');
}
