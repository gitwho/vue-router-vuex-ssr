const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const merge = require('webpack-merge') // 合并webpack配置
// 非js文件 打包成静态文件
const ExtractPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config.base')

const VueClientPlugin = require('vue-server-renderer/client-plugin')
// package.json启动方式中定义的环境变量 eg: 'NODE_EVN=production' 都存在 process.env中
const isDev = process.env.NODE_ENV === 'development'

// 添加 dev-server 配置
const devServer = {
  port: 8000,
  host: 'localhost',
  overlay: {
    errors: true // 显示错误
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: { // 将index文件设置成 路径里的index HTML文件
    // 解决： 去掉“#”的路由的形式，在刷新页面后，服务端匹配不到页面不显示
    index: '/public/index.html'
  },
  hot: true, // 渲染改变的部分
  // open: true    //自动打开浏览器
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  }
}

const defaultPlugins = [
  // 判断环境， vue,react 根据变量 会区分打包
  new webpack.DefinePlugin({
    'process.env': {
      NODE_EVN: isDev ? '"development"' : '"production"'
    }
  }),

  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),

  new VueClientPlugin()
]

let config

if (isDev) {
  config = merge(baseConfig, {
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
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(), // hot: true 需要以下插件
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      // app: path.join(__dirname, '../client/index.js'),
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue'] // vue-loader...
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // 把webpack相关代码打包到一个文件里， 需要放在‘vendor’后面
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/client-model.js')
  }
}

module.exports = config
