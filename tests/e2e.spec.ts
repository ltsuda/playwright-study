import { expect, test } from '../src/fixtures';

test.describe('E2E Suite: @e2e', () => {
  test.fixme('purchase item from item detail path', async () => {
    await test.step('login into application', async () => {
      // input and submit
      // expect inventory page
    });
    await test.step('go to random item details', async () => {
      // count items
      // get item details
      // click item name
      // expect item details
    });
    await test.step('add item to cart', async () => {
      // click add
      // click cart
      // expect item count
      // expect item details
    });
    await test.step('proceed checkout', async () => {
      // click checkout
      // fill checkout
      // click continue
    });
    await test.step('review purchase', async () => {
      // expect item count
      // expect item details
      // expect soft payment information
      // expect soft shipping information
      // expect item total
      // expect tax
      // expect total with tax
    });
    await test.step('complete purchase', async () => {
      // click finish
      // expect messages
    });
    expect(true).toBeFalsy();
  });
  test.fixme('purchase item from inventory path', async () => {
    await test.step('login into application', async () => {
      // input and submit
      // expect inventory page
    });
    await test.step('add random item to cart', async () => {
      // count items
      // get item details
      // click add
      // click cart
      // expect item count
      // expect item details
    });
    await test.step('proceed checkout', async () => {
      // click checkout
      // fill checkout
      // click continue
    });
    await test.step('review purchase', async () => {
      // expect item count
      // expect item details
      // expect soft payment information
      // expect soft shipping information
      // expect item total
      // expect tax
      // expect total with tax
    });
    await test.step('complete purchase', async () => {
      // click finish
      // expect messages
    });
    expect(true).toBeFalsy();
  });
});
