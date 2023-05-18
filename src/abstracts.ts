import { type Locator, type Page as PlaywrightPage } from '@playwright/test';

export abstract class ComponentObject {
  constructor(public readonly host: Locator) { }
}

export abstract class Page {
  constructor(public readonly page: PlaywrightPage) { }
}
