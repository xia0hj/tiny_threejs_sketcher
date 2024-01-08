import { buildSync } from "esbuild";

buildSync({
    entryPoints: ["src/index.ts"],
    sourcemap: true,
    format: "esm",
    bundle: true,
    outfile: "dist/index.js",
});
