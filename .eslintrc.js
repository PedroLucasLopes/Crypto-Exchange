module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: ["eslint:recommended", "plugin:vue/vue3-strongly-recommended"],
  plugins: ["vue"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "single"],
    indent: ["error", 2],
    "comma-spacing": ["error", { before: false, after: true }],
  },
};
