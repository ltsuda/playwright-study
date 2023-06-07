import { type Locator, type Page as PlaywrightPage } from '@playwright/test';

// reference idea from: https://github.com/microsoft/playwright/issues/1604#issuecomment-1004711489

export abstract class ComponentObject {
  constructor(public readonly host: Locator) {}
}

export abstract class Page {
  constructor(public readonly page: PlaywrightPage) {}
}
