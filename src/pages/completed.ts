import { Page } from '../abstracts';
import { CompletedContainer } from '../components/completed-container';
import { Footer } from '../components/footer';
import { SecondaryHeader } from '../components/secondary-header';

export class CompletedPage extends Page {
  public readonly thankyouContainer = new CompletedContainer(this.page.getByTestId('checkout-complete-container'));
  public readonly secondaryHeader = new SecondaryHeader(this.page.getByTestId('header-secondary'));
  public readonly footer = new Footer(this.page.getByTestId('footer'));
}
