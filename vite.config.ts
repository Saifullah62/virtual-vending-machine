import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Output to WordPress theme directory
    outDir: 'dist',
    // Generate assets with content hash
    assetsDir: 'assets',
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          payments: ['@stripe/stripe-js', '@stripe/react-stripe-js'],
        },
      },
    },
    // Enable minification
    minify: 'terser',
    // Enable source maps for production debugging
    sourcemap: true,
  },
  // Handle WordPress API proxy during development
  server: {
    proxy: {
      '/wp-json': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});