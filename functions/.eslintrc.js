module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double"],
    "linebreak-style": ["off"],
    "no-trailing-spaces": ["off"],
    "array-bracket-spacing": ["off"],
    "no-unused-vars": ["off"],
    "indent": ["off"],
    "padded-blocks": ["off"],
    "max-len": ["off"],
    "comma-spacing": ["off"],
    "comma-dangle": ["off"],
    "object-curly-spacing": ["off"],
    "camelcase": ["off"],
    "require-jsdoc": ["off"],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
