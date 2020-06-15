module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": [
      "error",
      { vars: "local", args: "after-used", ignoreRestSiblings: false },
    ],
  },
  plugins: ["prettier"],
  globals: {
    COLS_COUNT: false,
    ROWS_COUNT: false,
    field: false,
    doMove: false,
    unDoMove: false,
    declarewinner: false,
  },
};
