const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: {
    example: './src/example.js',

  },
  output: {
    filename:'[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    splitChunks: {//分离共用的lodash
      chunks:'all',//制定split Chunk 的类型：all、initial、async，默认initial，只会选择第一个分离，这里设置为all
      name: 'lodash' //指定公共 bundle 的名称。
    }
  },
  module: {
    rules: [
      {
        ///js ES2015+预发预处理器
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins:['@babel/plugin-transform-runtime']
          }
        }
      },
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
            //具体配置，请看官网：https://webpack.js.org/loaders/file-loader/
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
