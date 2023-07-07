import { type Locator } from '@playwright/test';
import { ComponentObject } from '../abstracts';

export class Product extends ComponentObject {
  public readonly image: Locator = this.host.locator('img.inventory_item_img');
  public readonly name: Locator = this.host.getByTestId('item-name');
  public readonly description: Locator = this.host.getByTestId('item-description');
  public readonly price: Locator = this.host.getByTestId('item-price');
  public readonly addToCart: Locator = this.host.getByTestId('button-add-to-cart');
  public readonly removeItem: Locator = this.host.getByText('Remove');
}

export class ProductInCheckout extends ComponentObject {
  public readonly name: Locator = this.host.getByTestId('item-name');
  public readonly description: Locator = this.host.getByTestId('item-description');
  public readonly price: Locator = this.host.getByTestId('item-price');
  public readonly quantity: Locator = this.host.getByTestId('item-quantity');
}

export class ProductInCart extends ComponentObject {
  public readonly name: Locator = this.host.getByTestId('item-name');
  public readonly description: Locator = this.host.getByTestId('item-description');
  public readonly price: Locator = this.host.getByTestId('item-price');
  public readonly quantity: Locator = this.host.getByTestId('item-quantity');
  public readonly removeItem: Locator = this.host.getByText('Remove');
}
