import { Page } from '../abstracts';
import { CheckoutContainer } from '../components/checkout-container';
import { ErrorContainer } from '../components/error-container';

export class CheckoutPage extends Page {
  public readonly checkoutContainer: CheckoutContainer = new CheckoutContainer(
    this.page.getByTestId('checkout-info-container')
  );
  public readonly errorContainer: ErrorContainer = new ErrorContainer(this.page.locator('.error-message-container'));
  public readonly cancelButton = this.page.getByTestId('button-cancel');
  public readonly continueButton = this.page.getByTestId('button-continue');
}
