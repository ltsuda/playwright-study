const cartLocators = {
  cartItem: "[class='cart_item']",
  cartItemQty: "[class='cart_quantity']",
  cartItemName: "[class='inventory_item_name']",
  cartItemDescription: "[class='inventory_item_desc']",
  cartItemPrice: "[class='inventory_item_price']",
  cartItemRemove: "text=/remove/i",
  continueShopping: "[data-test='continue-shopping']",
  checkout: "[data-test='checkout']",
}

class CartComponents {
  constructor(page) {
    this.page = page
  }

  async items() {
    return await this.page.$$(cartLocators.cartItem)
  }

  async itemsPrice() {
    return await this.page.$$(
      `${cartLocators.cartItem}` + ">>" + `${cartLocators.cartItemPrice}`
    )
  }

  async itemsName() {
    return await this.page.$$(
      `${cartLocators.cartItem}` + ">>" + `${cartLocators.cartItemName}`
    )
  }

  async itemsDescription() {
    return await this.page.$$(
      `${cartLocators.cartItem}` + ">>" + `${cartLocators.cartItemDescription}`
    )
  }

  async itemsQuantity() {
    return await this.page.$$(
      `${cartLocators.cartItem}` + ">>" + `${cartLocators.cartItemQty}`
    )
  }

  async removeItemButton(s) {
    return await this.page.$(
      `${cartLocators.cartItem}` + ">>" + `${cartLocators.cartItemRemove}`
    )
  }

  async continueShoppingButton() {
    return await this.page.$(cartLocators.continueShopping)
  }

  async checkoutButton() {
    return await this.page.$(cartLocators.checkout)
  }
}

module.exports = {
  CartComponents,
  cartLocators,
}
