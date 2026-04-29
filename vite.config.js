import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSharpImages from './vite-plugin-sharp-images.js'

export default defineConfig({
  plugins: [react(), vitePluginSharpImages()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          recaptcha: ['react-google-recaptcha'],
          emailjs: ['@emailjs/browser'],
        },
      },
    },
    // Performance optimizations
    sourcemap: false,
    minify: 'terser',
    target: 'es2020',
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2, // More aggressive compression passes
      },
      mangle: true,
      output: {
        comments: false,
      },
    },
    reportCompressedSize: true,
  },
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Permitted-Cross-Domain-Policies': 'none',
    },
  },
  define: {
    'process.env': '{}',
  },
})
