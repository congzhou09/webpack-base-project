const path = require('path');
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babelConfig from './babel.config.js';

export default defineConfig((command, mode, ssrBuild) => {
  return {
    // root: 'vite',
    build: {
      rollupOptions: {
        // input: {
        //   app: '/index.html',
        // },
      },
    },
    server: {
      // open: '/index.html',
      port: 2018,
    },
    plugins: [
      react({
        babel: { plugins: babelConfig.plugins },
      }),
    ],
    // optimizeDeps: {
    //   esbuildOptions: {
    //     loader: { '.js': 'jsx' }, // not work currently
    //   },
    // },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.ts', '.tsx'],
      alias: {
        '@utils': path.resolve(__dirname, './src/utils'),
      },
    },
  };
});
