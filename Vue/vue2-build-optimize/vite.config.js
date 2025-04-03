import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [createVuePlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 精确指向src目录
    }
  },
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'chuxin',
      formats: ['umd'],
      fileName: (format) => `chuxin.[hash].${format}.min.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})