import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path, { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    })
  ],
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
