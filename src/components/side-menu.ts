import { type Locator } from '@playwright/test';
import { ComponentObject } from '../abstracts';

export class SideMenu extends ComponentObject {
  public readonly closeButton: Locator = this.host.getByRole('button', { name: 'Close Menu' });
  public readonly allItemLink: Locator = this.host.getByTestId('link-all-items');
  public readonly aboutLink: Locator = this.host.getByTestId('link-about');
  public readonly logoutLink: Locator = this.host.getByTestId('link-logout');
  public readonly resetStateLink: Locator = this.host.getByTestId('link-reset-state');
  public readonly menu: Locator = this.host.getByTestId('link-reset-state');

  public async close() {
    await this.closeButton.click();
  }

  public async logout() {
    await this.logoutLink.click();
  }
}
