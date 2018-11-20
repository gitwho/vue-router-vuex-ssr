const path = require('path')
const CreateVueLoaderOptions = require('./vue-loader.config')

// package.json启动方式中定义的环境变量 eg: 'NODE_EVN=production' 都存在 process.env中
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web', // 适应 webpack-dev-server开发模式
  // 配置入口,  __dirname: 当前文件所在的目录地址
  // entry: path.join(__dirname, '../client/index.js'),
  entry: path.join(__dirname, '../client/client-entry.js'),
  // 出口
  output: {
    filename: 'bundle.[hash:8].js', // 文件名
    // path: path.join(__dirname, '../dist'),
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:8000/public/' // 会影响设置相关文件路径的配置，eg: webpack.config.client.js里devServer下historyApiFallback里的index路径
    //
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: '/node_modules/',
        enforce: 'pre' // 预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: CreateVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ // 忽略node_modules里面的文件
      },

      {
        test: /\.(gif|jpg|jpeg|svg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 文件大小限制
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }

}

module.exports = config
