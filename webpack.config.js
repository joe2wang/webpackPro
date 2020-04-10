const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

/** 生产的配置和开发的配置分开 */
const devConfig = require('./config/webpack.dev')
const prodConfig = require('./config/webpack.prod')

/**
 * 这是一开始照着官网学习的配置
 *
 */
let defaultConfig = {
  entry: {
    example: './src/example.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  mode: 'production', //设置production模式，npm run build打包后删除无用的代码
  devtool: 'inline-source-map', //这个设置后，开发调试就可以查看源码
  devServer: {
    contentBase: './dist', //配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件
    hot: true, // 热替换开启
    port: 8082 //改换默认端口
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          // use: 'css-loader'
          use: [
            {
              loader: 'css-loader',
              options: {
                // See https://github.com/webpack-contrib/css-loader#url
                url: true, //这个设置为true后，css的background引入的url路径才对，否则会找不到路径
                //minimize: true,
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(jpg|svg|png|gif|ttf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      //（官网的webapck插件文档https://www.webpackjs.com/plugins/extract-text-webpack-plugin/）
      filename: getPath => {
        return getPath('css/[name].css').replace('css/js', 'css')
      },
      allChunks: true
    }),
    new CleanWebpackPlugin(), //清除旧的打包文件
    new HtmlWebpackPlugin({
      //打包生成html，自动引入相关js文件
      title: '这只是一个栗子'
    }),
    new webpack.NamedModulesPlugin(), //还添加了 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
    new webpack.HotModuleReplacementPlugin() //模块热替换：它允许在运行时更新各种模块，而无需进行完全刷新
  ]
}

module.exports = (env, argv) => {
  if (argv.ENV === 'dev') {//--ENV=dev
    console.log('启用开发环境的配置……')
    defaultConfig = devConfig
  }
  if (argv.ENV === 'prod') {//--ENV=prod
    console.log('启用生产环境的配置……')
    defaultConfig = prodConfig
  }
  //console.log(defaultConfig)
  return defaultConfig
}
