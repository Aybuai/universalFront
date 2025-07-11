import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // 软连接
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  // 代理
  server: {
    proxy: {
      // 代理所有 /api 的请求，该请求将被代理到 target 中
      '/api': {
        // 代理请求之后的请求地址
        target: 'https://api.imooc-front.lgdsunday.club',
        // 跨域
        changeOrigin: true
      },
      '/prod-api': {
        // 代理请求之后的请求地址
        target: 'https://api.imooc-front.lgdsunday.club',
        // 跨域
        changeOrigin: true
      }
    }
  }
})
