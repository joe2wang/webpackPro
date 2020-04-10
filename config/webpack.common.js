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
        // use: ['style-loader', 'css-loader']
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          // use: 'css-loader'
          use: [
            {
              loader: 'css-loader',
              options: {
                // See https://github.com/webpack-contrib/css-loader#url
                url: (url, resourcePath) => {
                  // resourcePath - path to css file
                  console.log(url, resourcePath)
                  // // Don't handle `img.png` urls
                  // if (url.includes('img.png')) {
                  //   return false;
                  // }

                  return true
                }, //这个设置为true后，css的background引入的url路径才对，否则会找不到路径
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
    })
  ]
}
