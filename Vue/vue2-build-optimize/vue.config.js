const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: './',
  // configureWebpack: {
  //   output: {
  //     libraryExport: 'default'
  //   }
  // },
  lintOnSave: false,
  productionSourceMap: false,
  assetsDir: './assets',
  css: {
    extract: {
      ignoreOrder: true,
    },
  },
})
