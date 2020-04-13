const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: {
    example: './src/example.js',
    another: './src/another.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    splitChunks: {
      name: 'common'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(jpg|svg|png|gif|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images'
            }
          }
        ]
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
    })
  ]
}
