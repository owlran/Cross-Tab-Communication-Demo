import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          // Index.html
          filename: 'index.html',
          template: 'index.html',
        },
        {
          // Index_demo.html
          filename: 'index_demo.html',
          template: 'index_demo.html',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        demo: 'index_demo.html',
      },
    },
  },
});
