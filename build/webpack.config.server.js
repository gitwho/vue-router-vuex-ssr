const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge') // 合并webpack配置
const baseConfig = require('./webpack.config.base')

// 添加 dev-server 配置
const devServer = {
  port: 8080,
  host: 'localhost',
  overlay: {
    errors: true // 显示错误
  },
  // historyFallback: {

  // },
  hot: true // 渲染改变的部分
  // open: true    //自动打开浏览器
}

const defaultPlugins = [
  // 判断环境， vue,react 根据变量 会区分打包
  new webpack.DefinePlugin({
    'process.env': {
      NODE_EVN: '"development"'
    }
  }),

  new HTMLPlugin({
    // 定义生成参照模板
    template: path.join(__dirname, 'template.html')
  })
]

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  // 帮助在页面调试代码， 因为浏览器里都是编译后的代码
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader', // 可以使用热更新功能
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     module: true, //开启cssModule模式
          //     localIdentName: isDiv ? '[path]-[name]-[hash:base64:5]' : "[hash:base64:5]", //编译生成css名
          //   }
          // },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // import Vue from 'vue' , 定义vue的文件
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(), // hot: true 需要以下插件
    new webpack.NoEmitOnErrorsPlugin()
  ])
})
module.exports = config
