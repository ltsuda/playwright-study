const PAGES = {
    LOGIN: "",
    INVENTORY: "/inventory.html",
    INVENTORY_ITEM: "/inventory-item.html",
    CART: "/cart.html",
    CHECKOUT: "/checkout-step-one.html",
    OVERVIEW: "/checkout-step-two.html",
    COMPLETED: "/checkout-complete.html",
    ABOUT: "https://saucelabs.com/",
}

const SOCIAL_LINKS = {
    TWITTER: "https://twitter.com/saucelabs",
    FACEBOOK: "https://www.facebook.com/saucelabs",
    LINKEDIN: "https://www.linkedin.com/company/sauce-labs/",
}

const CREDENTIALS = {
    USERS: {
        STANDARD: "standard_user",
        LOCKED: "locked_out_user",
        PROBLEM: "problem_user",
        PERFORMANCE: "performance_glitch_user",
    },
    PASSWORD: "secret_sauce",
}

const PERSONAL_INFO = {
    USER1: {
        FIRST_NAME: "John",
        LAST_NAME: "Doe",
        ZIP: "555-5555",
    },
}

const PRODUCTS_NAMES = {
    BACKPACK: "Sauce Labs Backpack",
    BIKELIGHT: "Sauce Labs Bike Light",
    BOLT_TSHIRT: "Sauce Labs Bolt T-Shirt",
    JACKET: "Sauce Labs Fleece Jacket",
    ONESIE: "Sauce Labs Onesie",
    ALL_TSHIRT: "Test.allTheThings() T-Shirt (Red)",
}

const PRODUCTS_INDEX = {
    BACKPACK: 4,
    BIKELIGHT: 0,
    BOLT_TSHIRT: 1,
    JACKET: 5,
    ONESIE: 2,
    ALL_TSHIRT: 3,
}

const ERRORS = {
    LOGIN_USER: "Epic sadface: Username is required",
    LOGIN_LOCKED: "Epic sadface: Sorry, this user has been locked out.",
    LOGIN_CREDENTIALS: "Epic sadface: Username and password do not match any user in this service",
    PERSONAL_FIRSTNAME: "Error: First Name is required",
    PERSONAL_LASTNAME: "Error: Last Name is required",
    PERSONAL_ZIP: "Error: Postal Code is required",
}

const MESSAGES = {
    COMPLETED_THANKS: "Thank you for your order!",
    COMPLETED_DISPATCH: "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    COPYRIGHT: "© 2023 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy",
    OVERVIEW_CARD: "SauceCard #31337",
    OVERVIEW_SHIPMENT: "Free Pony Express Delivery!",
}

const IMAGES = {
    PONY_EXPRESS: "/static/media/pony-express.46394a5d.png",
    SWAG_BOT: "/static/media/SwagBot_Footer_graphic.2e87acec.png",
}

module.exports = {
    PAGES,
    SOCIAL_LINKS,
    CREDENTIALS,
    PERSONAL_INFO,
    PRODUCTS_NAMES,
    PRODUCTS_INDEX,
    ERRORS,
    MESSAGES,
    IMAGES,
}
