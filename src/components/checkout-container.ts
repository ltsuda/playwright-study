import { type Locator } from '@playwright/test';
import { ComponentObject } from '../abstracts';

export class CheckoutContainer extends ComponentObject {
  public readonly firstNameInput: Locator = this.host.getByTestId('input-first-name');
  public readonly lastNameInput: Locator = this.host.getByTestId('input-last-name');
  public readonly zipcodeInput: Locator = this.host.getByTestId('input-postal-code');
}
