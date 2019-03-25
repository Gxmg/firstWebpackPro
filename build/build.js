'use strict'
// package.json 文件的打包命令，运行这个文件 来打包上线
require('./checkVersion.js'); // 打包之前先检查 node 和 npm 的版本

process.env.NODE_DEV = 'production'; // 设置环境变量为production (build 部署到测试或者生产环境而不是本地环境)

const ora = require('ora'); // 命令行转圈动画插件 为了好看用的
const rm = require('rimraf'); // shell命令 用来删除文件夹或者文件 删除原有的dist文件，然后重新生成
const path = require('path'); // node的path，获取路径的模块
const chalk = require('chalk'); // 命令行文字的颜色插件

const webpack = require('webpack'); // 引入webpack模块，用来使用webpack的方法和插件
const config = require('../config'); // 引入config文件夹下的index.js文件   里面是一些通用的配置选项
const webpackConfig = require('./webpack.prod.conf'); // 引入生产环境的核心配置文件
const spinner = ora('++++++++++building for production.....');
spinner.start();// 开启转圈动画

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  // 通过config获取dist 和 dist的static 子目录 调用rm 方法删除
  if (err) throw err;
  webpack(webpackConfig, function(err, stats) {
    // 回调函数在编译过程中执行
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      // stats 对象中保存着编译过程中的各种信息
      colors: true, // 增加控制台颜色 开关
      modules: false, //  不增加内置模块信息
      children: false,
      chunks: false,
      cnhunkModules: false,
    }) + '\n\n')
    // 以上就是编译过程中持续打印信息
    console.log(chalk.cyan('  Build complete.\n'))
    // console.log(chalk.yellow(
    //   '  Tip: built files are meant to be served over an HTTP server.\n' +
    //   '  Opening index.html over file:// won\'t work.\n'
    // ))
  })
})
