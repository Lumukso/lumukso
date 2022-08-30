module.exports = {
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint", "react-hooks-addons", "react-hooks"],
    "rules": {
        "react-hooks-addons/no-unused-deps": "warn",
        "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
    }
}
