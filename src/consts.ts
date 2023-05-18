export const PAGES = {
    LOGIN: "",
    INVENTORY: "/inventory.html",
    INVENTORY_ITEM: "/inventory-item.html",
    CART: "/cart.html",
    CHECKOUT: "/checkout-step-one.html",
    OVERVIEW: "/checkout-step-two.html",
    COMPLETED: "/checkout-complete.html",
    ABOUT: "https://saucelabs.com/",
}

export const SOCIAL_LINKS = {
    TWITTER: "https://twitter.com/saucelabs",
    FACEBOOK: "https://www.facebook.com/saucelabs",
    LINKEDIN: "https://www.linkedin.com/company/sauce-labs/",
}

export const CREDENTIALS = {
    USERS: {
        STANDARD: "standard_user",
        LOCKED: "locked_out_user",
        PROBLEM: "problem_user",
        PERFORMANCE: "performance_glitch_user",
    },
    PASSWORD: "secret_sauce",
}

export const PERSONAL_INFO = {
    USER1: {
        FIRST_NAME: "John",
        LAST_NAME: "Doe",
        ZIP: "555-5555",
    },
}

export const PRODUCTS_NAMES = {
    BACKPACK: { name: "Sauce Labs Backpack", index: 4 },
    BIKELIGHT: { name: "Sauce Labs Bike Light", index: 0 },
    BOLT_TSHIRT: { name: "Sauce Labs Bolt T-Shirt", index: 1 },
    JACKET: { name: "Sauce Labs Fleece Jacket", index: 5 },
    ONESIE: { name: "Sauce Labs Onesie", index: 2 },
    ALL_TSHIRT: { name: "Test.allTheThings() T-Shirt (Red)", index: 3 },
}


export const ERRORS = {
    LOGIN_USER: "Epic sadface: Username is required",
    LOGIN_LOCKED: "Epic sadface: Sorry, this user has been locked out.",
    LOGIN_CREDENTIALS: "Epic sadface: Username and password do not match any user in this service",
    PERSONAL_FIRSTNAME: "Error: First Name is required",
    PERSONAL_LASTNAME: "Error: Last Name is required",
    PERSONAL_ZIP: "Error: Postal Code is required",
}

export const MESSAGES = {
    COMPLETED_THANKS: "Thank you for your order!",
    COMPLETED_DISPATCH: "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    COPYRIGHT: "© 2023 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy",
    OVERVIEW_CARD: "SauceCard #31337",
    OVERVIEW_SHIPMENT: "Free Pony Express Delivery!",
}
