const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
// 非js文件 打包成静态文件
const ExtractPlugin = require('extract-text-webpack-plugin')

// package.json启动方式中定义的环境变量 eg: 'NODE_EVN=production' 都存在 process.env中
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web', // 适应 webpack-dev-server开发模式
  // 配置入口,  __dirname: 当前文件所在的目录地址
  entry: path.join(__dirname, 'src/index.js'),
  // 出口
  output: {
    filename: 'bundle.[hash:8].js', // 文件名
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },

      {
        test: /\.(gif|jpg|jpeg|svg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 文件大小限制
              name: '[name]-aaanpm.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 判断环境， vue,react 根据变量 会区分打包
    new webpack.DefinePlugin({
      'process.env': {
        NODE_EVN: isDev ? '"development"' : '"production"'
      }
    }),

    new HTMLPlugin()
  ]
}

if (isDev) {
  config.module.rules.push(
    {
      test: /\.styl/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  )
  // 帮助在页面调试代码， 因为浏览器里都是编译后的代码
  config.devtool = '#cheap-module-eval-source-map',
  // 添加 dev-server 配置
  config.devServer = {
    port: 8000,
    host: 'localhost',
    overlay: {
      errors: true // 显示错误
    },
    // historyFallback: {

    // },
    hot: true // 渲染改变的部分
    // open: true    //自动打开浏览器
  },
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin() // hot: true 需要以下插件
    // new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue'] // vue-loader...
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
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
  )
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 把webpack相关代码打包到一个文件里， 需要放在‘vendor’后面
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config
