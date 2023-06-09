import { Page } from '../abstracts';

export class ReviewPage extends Page {
  public readonly cancelButton = this.page.getByTestId('button-cancel');
  public readonly paymentLabel = this.page.getByTestId('label-payment-information');
  public readonly paymentValue = this.page.getByTestId('value-payment-information');
  public readonly shippingLabel = this.page.getByTestId('label-shipping-information');
  public readonly shippingValue = this.page.getByTestId('value-shipping-information');
  public readonly subtotalValue = this.page.getByTestId('value-subtotal');
  public readonly taxValue = this.page.getByTestId('label-tax');
  public readonly totalValue = this.page.getByTestId('label-total');
}
