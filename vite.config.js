import { defineConfig } from 'vite';

export default defineConfig((command, mode, ssrBuild) => {
  return {
    // root: 'vite',
    build: {
      rollupOptions: {
        input: {
          app: '/vite.html',
        },
      },
    },
    server: {
      open: '/vite.html',
      port: 2018,
    },
  };
});
