import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5176,
    allowedHosts: [
      "cheehouse.io.vn"
    ],
    // Local dev only — production nginx proxies /api and /uploads to the backend directly.
    proxy: {
      '/api': 'http://localhost:4180',
      '/uploads': 'http://localhost:4180',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
