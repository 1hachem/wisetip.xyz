/** @type {import("prettier").Config} */
const config = {
  jsxSingleQuote: true,
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  bracketSameLine: false,
  useTabs: false,
  arrowParens: "always",
  endOfLine: "auto",
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
