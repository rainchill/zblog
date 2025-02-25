import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { terser } from 'rollup-plugin-terser';
import path from 'path' // 引入 path 模块

export default defineConfig({
  plugins: [
    react(),
    terser({
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true, // 移除 debugger
      },
      output: {
        comments: false, // 移除所有注释
      },
    })
  ],
  build: {
    outDir: 'dist', // 输出目录
    minify: 'terser', // 指定使用 Terser 进行压缩
    rollupOptions: {
      output: {
        manualChunks: {
          // 手动分包，将第三方库单独打包
          // react: [
          //   'react',
          //   'react-dom',
          //   'redux',
          //   'react-redux',
          //   'react-router-dom',
          // ],
          markdown: [
            'react-markdown',
            'github-markdown-css',
            'react-syntax-highlighter',
            'rehype-raw',
            'remark-gfm'
          ],
          antd: [
            'antd'
          ],
          misc: [
            'axios',
            'classnames',
            'moment',
            'dayjs'
          ],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true, // 移除 debugger
      },
      mangle: true, // 启用变量名混淆
      format: {
        comments: false, // 移除所有注释
      },
    },
  },
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