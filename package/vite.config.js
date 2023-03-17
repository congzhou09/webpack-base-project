const path = require('path');
import { defineConfig } from 'vite';

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
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.ts', '.tsx'],
      alias: {
        '@utils': path.resolve(__dirname, './src/utils'),
      },
    },
  };
});
