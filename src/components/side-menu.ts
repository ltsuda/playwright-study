import { type Locator } from '@playwright/test';
import { ComponentObject } from '../abstracts';

export class SideMenu extends ComponentObject {
  public readonly openButton: Locator = this.host.getByRole('button', { name: 'Open Menu' });
  public readonly closeButton: Locator = this.host.getByRole('button', { name: 'Close Menu' });
  public readonly allItemLink: Locator = this.host.getByTestId('link-all-items');
  public readonly aboutLink: Locator = this.host.getByTestId('link-about');
  public readonly logoutLink: Locator = this.host.getByTestId('link-logout');
  public readonly resetStateLink: Locator = this.host.getByTestId('link-reset-state');
}
