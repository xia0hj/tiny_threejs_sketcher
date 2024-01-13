//@ts-check

import { buildSync, context } from "esbuild";
import { generateDtsBundle } from "dts-bundle-generator";
import { writeFileSync } from "node:fs";

const mode = process.argv[2];

if (mode === "--dev") {
  const ctx = await context({
    entryPoints: ["src/export.ts"],
    format: "esm",
    bundle: true,
    outfile: "dist/index.js",
    sourcemap: true,
    plugins: [
      {
        name: "dev",
        setup(build) {
          build.onStart(() => {
            console.clear();
            console.log(`${new Date().toLocaleString()} building ...`);
          });
          build.onEnd(generateDts);
        },
      },
    ],
  });
  await ctx.watch();
} else if (mode === "--prod") {
  buildSync({
    entryPoints: ["src/export.ts"],
    treeShaking: true,
    minify: true,
    format: "esm",
    bundle: true,
    outfile: "dist/index.js",
  });
  generateDts();
}

function generateDts() {
  const [indexdts] = generateDtsBundle([{ filePath: "src/export.ts" }]);
  writeFileSync("./dist/index.d.ts", indexdts);
  console.log(`${new Date().toLocaleString()} build success !`);
}
