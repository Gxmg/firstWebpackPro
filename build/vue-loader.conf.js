'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled, // 是否开始sourceMap 用来调试
    extract: isProduction // 是否单独提取抽离css
  }),
  // 记录压缩的代码，用来找到源码位置 
  cssSourceMap: sourceMapEnabled,
  // 是否缓存破坏
  cacheBusting: config.dev.cacheBusting,
  // transformToRequire的作用是在模块编译的过程中，编译器可以将某些属性，比如src转换为require调用
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
