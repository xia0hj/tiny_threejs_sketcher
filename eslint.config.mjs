// @ts-check

import { eslintConfigXiaohj, typedConfig } from "eslint-config-xiaohj";

export default [
    ...eslintConfigXiaohj({
        typescript: true,
        react: true,
    }),
    ...typedConfig({
        ignores: ["**/dist/**/*"],
    }),
];
