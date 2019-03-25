// 这个文件是生产环境的核心配置文件
'use strict'
const path = require('path')
const utils = require('./utils') // 工具类  主要用来处理css类的loader
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const env = config.build.env
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 把utils中配置好的各种css loaders 拿过来
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSouceMap,
      extract: true // 生成独立文件
    })
  },
  devtool: config.build.productionSouceMap ? '#source-map' : false, // 生成source-map类型的map文件
  ourtput: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js')
  }

})
