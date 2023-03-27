const path = require('path');
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import checker from 'vite-plugin-checker';

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
      vue(),
      vueJsx(),
      checker({
        typescript: true,
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.ts', '.tsx'],
      alias: {
        '@utils': path.resolve(__dirname, './src/utils'),
      },
    },
  };
});
