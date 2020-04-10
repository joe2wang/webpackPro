const express = require('express')
const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
const app = express()
const complier = webpack(config)
app.use(
  WebpackDevMiddleware(complier, {
    publicPath: config.output.publicPath
  })
)
app.listen(3000, 'localhost',function () {
  console.log('服务正在启动中……')
})
