import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 引入 path 模块

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 配置 @ 别名指向 src 目录
    },
  },
  server: {
    proxy: {
      '/qq': {
        target: 'https://api.leafone.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 去掉路径中的 `/api`
      }
    }
  }
})