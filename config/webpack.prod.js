const common = require('./webpack.common')
const merge = require('webpack-merge')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

const pluginList = common.plugins.concat([
  new UglifyjsWebpackPlugin({
    sourceMap: true //设置后，生产打包也能看源码进行调试
  })
])
module.exports = merge(common, {
  mode: 'production', //设置production模式，npm run build打包后删除无用的代码
  devtool: 'source-map',
  plugins: pluginList
})
