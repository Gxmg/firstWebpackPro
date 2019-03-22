'use strict'
// package.json 文件的打包命令，运行这个文件 来打包上线
require('./checkVersion.js'); // 打包之前先检查 node 和 npm 的版本

process.env.NODE_DEV = 'product'; // 设置环境变量为production (build 部署到测试或者生产环境而不是本地环境)

const ora = require('ora'); // 命令行转圈动画插件 为了好看用的
const rm = require('rimraf'); // shell命令 用来删除文件夹或者文件 删除原有的dist文件，然后重新生成
const path = require('path'); // node的path，获取路径的模块
const chalk = require('chalk'); // 命令行文字的颜色插件
const webpack = require('webpack'); // 引入webpack模块，用来使用webpack的方法和插件
const config = require('../config'); // 引入config文件夹下的index.js文件
