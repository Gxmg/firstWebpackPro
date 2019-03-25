'use strict'
// 此文件是用来定义开发环境和生成环境的一些所需要的参数
var path = require('path')

module.exports = {
  build: {
    // 打包部生产或者测试环境服务器 代理用nginx转发
    env: require('./prod.env'), // 用来指定当前的环境为生产环境
    index: path.resolve(__dirname, '../dist/index.html'), // 相对路径的拼接
    assetsRoot: path.resolve(__dirname, '../dist'), // 定义打包后静态资源的根目录dist
    assetsSubDirectory: 'static', // 定义静态资源根目录下的子目录 static
    assetspublicPath: '/', // 定义静态资源的公开路径，也就是真正的引用路径
    productionSouceMap: true, // 是否生成生产环境的sourcmap，sourcmap是用来debug编译后文件的，通过映射到编译前文件来实现
    productionGzip: false, // 是否在生产环境中压缩代码
    productionGzipExtensions: ['js', 'css'], // 定义要压缩那些类型的文件
    bundleAnalyerRrport: process.env.npm_config_report // process.env.npm_config_report表示定义的一个npm_config_report环境变量，可以自行设置
  },
  dev: {
    env: require('./dev.env'), // 指定当前环境为开发环境
    prot: 8080, // dev-server的端口号，可以自行更改
    assetsSubDirectory: 'static', // 定义静态资源根目录下的子目录 static
    assetspublicPath: '/', // 定义静态资源的公开路径，也就是真正的引用路径
    proxyTable: {
      // 这里配置开发环境的代理
      
    },
    autoOpenBrowser: false, // 是否在启动完成自动打开浏览器
    errorOverlay: true, // 是否查询错误
    notifyOnErrors: true, // 是否通知错误
    poll: false,
    devtool: 'cheap-module-eval-source-map', // js抛出异常时显示第几行
    cacheBusting:true, //是否缓存破
    cssSourceMap:true //记录压缩的代码，用来找到源码位置
  }
}