import { type Locator } from '@playwright/test';
import { ComponentObject } from '../abstracts';
import { CartContainer } from './cart-container';
import { SideMenu } from './side-menu';

export class PrimaryHeader extends ComponentObject {
  public readonly appLogo: Locator = this.host.locator('.app_logo');
  public readonly cart: CartContainer = new CartContainer(this.host.locator('.shopping_cart_container'));
  public readonly sideMenu: SideMenu = new SideMenu(this.host.locator('.bm-menu-wrap'));
  public readonly openSideMenuButton: Locator = this.host.getByRole('button', { name: 'Open Menu' });

  public async openSideMenu() {
    await this.openSideMenuButton.click();
  }
}
