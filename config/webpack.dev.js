
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const pluginList = common.plugins.concat([
  new webpack.NamedModulesPlugin(), //还添加了 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
  new webpack.HotModuleReplacementPlugin() //模块热替换：它允许在运行时更新各种模块，而无需进行完全刷新
])

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', //这个设置后，开发调试就可以查看源码
  devServer: {
    contentBase: './dist', //配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件
    hot: true, // 热替换开启,
    port: 8880 //改换默认端口
  },
  plugins: pluginList
})
