module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
        mocha: true
    },
    extends: "eslint:recommended",
    globals: {},
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        indent: [ "error", ],
        "linebreak-style": [ "error", "unix" ],
        quotes: [ "error", "double" ],
        semi: [ "error", "never" ],
        "array-bracket-spacing": [ "error", "always" ],
        "object-curly-spacing": [ "error", "always" ],
        "space-in-parens": [ "error", "always" ]
    }
}
