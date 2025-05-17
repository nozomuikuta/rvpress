import { builtinModules, createRequire } from 'node:module'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const external = [
  // // @ts-expect-error until dependencies filed is added
  ...Object.keys(pkg.dependencies ?? {}),
  // // @ts-expect-error until peerDependencies filed is added
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...builtinModules.flatMap((m) => m.includes('punycode') ? [] : [m, `node:${m}`]
  )
]

const plugins = [
  commonjs(),
  nodeResolve({ preferBuiltins: false }),
  esbuild({ target: "node18" }),
  json()
]

const cliConfig = defineConfig({
  input: 'src/node/cli.ts',
  output: {
    file: 'dist/node/cli.js',
    format: 'esm',
  },
  external,
  plugins,
})

export default defineConfig([cliConfig])
