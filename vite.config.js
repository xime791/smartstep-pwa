// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build' ,// Cambia la carpeta de salida a 'build'
  },
  server:{
  port: 3000,
},
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    exclude: [...configDefaults.exclude, 'node_modules/'],
  },
});
