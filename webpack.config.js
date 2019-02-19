var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './src/main.js'], // 入口文件，webpack会从main.js开始，把所有依赖的JS 都打包
  output: {
    path: path.resolve(__dirname, './dist'), // 项目打包后 生成的文件 放到哪里
    publicPath: '/dist/', // 通过devServer访问的文件路径
    filename: 'build.js' // 打包后的文件名
  },
  devServer: {
    historyApiFallback: true, // 当使用html5 history api,将会在响应404时返回index.html。想要开启该功能进行如下设置。
    overlay: true, // 在浏览器上全屏显示编译的errors或warnings。默认是关闭的。true之显示编译错误
  },
  resolve: {
    alias: { // //配置别名，在项目中可缩减引用路径 ，简写路径。
      'vue$': 'vue/dist/vue.esm.js' 
    }
  },
  plugins: [
    new VueLoaderPlugin()// v15版本的vue-loader需要跟webpack的插件结合使用，不然会报错
  ],
  devtool: '#eval-source-map', // 设置这个代码调试时展示的对应的组件内的，而不是压缩的文件里
  module: {
    rules: [
      {
        test: '/\.css$/', 
        /*
        匹配后缀名为css的文件,然后分别用css-loader，vue-style-loader去解析。
        解析器的执行顺序是从下往上(先css-loader再vue-style-loader)
        注意：因为我们这里用vue开发，所以使用vue-style-loader，其他情况使用style-loader
        */
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
        ],
    },
    {
        test: /\.sass$/,
        use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader?indentedSyntax'
        ],
    },
    {
      // 配置babel，exclude表示忽略node-modules下的文件
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
          name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
          loaders: {
              'scss': [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
              ],
              'sass': [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader?indentedSyntax'
              ]
          }
      }
    }
    ]
  }
};