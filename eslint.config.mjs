// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
    eslint.configs.recommended,

    // typescript-eslint
    ...tseslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },

    // react
    {
        files: [
            "*.ts",
            "*.tsx",
        ],
        plugins: {
            // @ts-expect-error eslint-plugin-react-hooks
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        // @ts-expect-error eslint-plugin-react-hooks
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
        },
    },

    // stylistic
    stylistic.configs["recommended-flat"],
    {
        plugins: {
            "@stylistic": stylistic,
        },
        rules: {
            // "@stylistic/semi": ["warn", "always"],
            "@stylistic/indent": ["warn", 4],
            "@stylistic/quotes": ["warn", "double"],
            "@stylistic/jsx-indent-props": ["warn", 4],
        },
    },

    // ignore
    {
        ignores: [
            "**/dist/**/*",
        ],
    },
);
