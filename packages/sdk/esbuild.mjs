import { buildSync } from 'esbuild';

buildSync({
  entryPoints: ['src/main.ts'],
  sourcemap: true,
  format: 'esm',
  bundle: true,
  outfile: 'dist/sdk.mjs'
})

