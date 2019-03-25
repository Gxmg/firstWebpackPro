'use strict'
const path = require('path')
const config = require('../config')
const extractTextPlugin = require('extract-text-webpack-plugin') // 把style中的css样式都提取到单独的文件中

exports.assetsPath = function(_path) {
  // 如果配置的 环境是生产环境 assetsSubDirectory是static 否则还是static 因为config/index.js里面 两个配置都是static
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
  ? config.build.assetsSubDirectory
  : config.build.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path);
}
exports.cssLoaders = function(options) {
  // config/index.js 调用这个方法  用来配置 cssloader 的 rule 
  options = options || {}
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap:options.sourceMap
    }
  }
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    if (options.extract) {
      // 设置生成独立文件  extract 为true
      return extractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader' // fallback表示如果css文件没有成功导入就使用vue-style-loader导入
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\' + extension + '$'),
      use: loader
    })
  }
  return output;
}