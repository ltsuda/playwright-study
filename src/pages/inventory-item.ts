import { Page } from '../abstracts';
import { SecondaryHeader } from '../components/secondary-header';

export class InventoryItemPage extends Page {
  public readonly secondaryHeader = new SecondaryHeader(this.page.getByTestId('header-secondary'));
}
