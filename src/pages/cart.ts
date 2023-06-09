import { Page } from '../abstracts';
import { PrimaryHeader } from '../components/primary-header';

export class CartPage extends Page {
  public readonly primaryHeader = new PrimaryHeader(this.page.getByTestId('header-primary'));
  public readonly continueShoppingButton = this.page.getByTestId('button-continue-shopping');
  public readonly checkoutButton = this.page.getByTestId('button-checkout');
}
