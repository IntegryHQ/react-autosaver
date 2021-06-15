/* eslint-disable no-console */
/**
 * Main Rollup config file
 */

import chalk from 'chalk';
import ts from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import serve from 'rollup-plugin-serve';
// import livereload from 'rollup-plugin-livereload';
import clear from 'rollup-plugin-clear';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

const outputDir = './dist';

const GLOBALS = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
};

/**
 * Simple way to generate different 'environments' using environment variables
 *
 * @param {Object} config Config passed to plugin array generator
 * @param {boolean} config.prodMode Whether to run build in prod mode
 * @param {boolean} config.minify Whether to minify output code using Terser
 * @param {boolean} config.hmr Whether to build the code or run in dev mode using hot reload and HMR
 * @returns {Array} Rollup plugin array
 */
const getPluginsConfig = (config) => {
  const { prodMode, minify } = config;

  const pluginArr = [
    clear({
      targets: [`${outputDir}/esm`, `${outputDir}/cjs`],
      watch: true,
    }),
    nodeResolve({
      browser: true,
      resolveOnly: [/^(?!react$)/, /^(?!react-dom$)/, /^(?!prop-types)/],
    }),
    ts({
      transpiler: 'babel',
    }),
    commonjs(),
    filesize(),
  ];
  if (minify) {
    pluginArr.push(
      terser({
        output: {
          comments: !prodMode,
        },
      }),
    );
  }
  // if (hmr) {
  //   pluginArr.push(
  //     serve({
  //       contentBase: ["dist", "playground"],
  //     }),
  //     livereload({
  //       watch: "dist",
  //     })
  //   );
  // }
  return pluginArr;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  const enableProdMode = !!process.env.PROD_MODE_ENABLED;
  const shoudMinify = !!process.env.MINIFY_ENABLED;
  const shouldEnableHMR = !!process.env.HOT_RELOAD_ENABLED;

  console.log(
    chalk.keyword('orange')('\nBuilding and compiling react-autosaver'),
  );

  console.log(`
     MINIFY_ENABLED: ${chalk.keyword('orange')(shoudMinify)}
     PROD_MODE_ENABLED: ${chalk.keyword('orange')(enableProdMode)}
     HOT_RELOAD_ENABLED: ${chalk.keyword('orange')(shouldEnableHMR)}
   `);

  const bundle = {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        globals: GLOBALS,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        globals: GLOBALS,
      },
    ],
    external: ['react', 'react-dom', 'prop-types', /@babel\/runtime/],
  };

  bundle.plugins = getPluginsConfig({
    prodMode: enableProdMode,
    minify: shoudMinify,
    hmr: shouldEnableHMR,
  });

  return bundle;
};
