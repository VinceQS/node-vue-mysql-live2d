// const path = require('path')
// // 导入compression-webpack-plugin
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// // 定义压缩文件类型
// const productionGzipExtensions = ['js', 'css']
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
module.exports = {
  // 根路径
  publicPath: '/',

  // 构建时输出目录
  outputDir: 'dist',

  // 构建时输出在 outputDir 中 静态资源目录
  assetsDir: 'static',

  // html 输出路径
  indexPath: 'index.html',

  filenameHashing: true,

  // 页面配置
  pages: {
    index: {
      // 入口文件
      entry: './src/main.js',
      // 模板文件
      template: 'public/index.html'
    }
  },

  // 在保存时开启 eslint 检测
  lintOnSave: true,

  runtimeCompiler: false,

  devServer: {
    host: 'localhost',
    port: 8080,
    open: false
  }

  // configureWebpack: config => {
  //   config.resolve.alias['@'] = resolve('src')
  //   config.performance = {
  //     hints: 'warning',
  //     // 入口起点的最大体积 整数类型（以字节为单位）
  //     maxEntrypointSize: 50000000,
  //     // 生成文件的最大体积 整数类型（以字节为单位 300k）
  //     maxAssetSize: 30000000,
  //     // 只给出 js 文件的性能提示
  //     assetFilter: function(assetFilename) {
  //       return assetFilename.endsWith('.js')
  //     }
  //   }
  //   config.plugins.push(
  //     new CompressionWebpackPlugin({
  //       filename: '[path].gz[query]',
  //       algorithm: 'gzip',
  //       test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
  //       threshold: 10240,
  //       minRatio: 0.8
  //     })
  //   )
  // },

  // chainWebpack(config) {
  //   config.plugins.delete('preload') // TODO: need test
  //   config.plugins.delete('prefetch') // TODO: need test
  //   // set preserveWhitespace
  //   config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
  //     options.compilerOptions.preserveWhitespace = true
  //     return options
  //   }).end()
  //   // svg
  //   const svgRule = config.module.rule('svg')
  //   svgRule.uses.clear()
  //   svgRule.test(/\.svg$/).include.add(path.resolve(__dirname, './src/icons/svg')).end()
  //     .use('svg-sprite-loader').loader('svg-sprite-loader').options({
  //       symbolId: 'icon-[name]'
  //     })
  //   const fileRule = config.module.rule('file')
  //   fileRule.uses.clear()
  //   fileRule.test(/\.svg$/).exclude.add(path.resolve(__dirname, './src/icons/svg')).end()
  //     .use('file-loader').loader('file-loader')
  // }

}
