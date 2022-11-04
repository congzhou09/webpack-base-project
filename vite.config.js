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
  };
});
