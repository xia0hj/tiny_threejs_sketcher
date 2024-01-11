/**
 * @type {import('eslint').Linter.Config}
 */
const eslintConfig = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}", "esbuild.js"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    ignorePatterns: ["dist"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
    },
};

module.exports = eslintConfig;
