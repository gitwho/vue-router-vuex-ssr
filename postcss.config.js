//postcss.config.js:  优化css代码

const autoprefixer = require('autoprefixer')   //加浏览器前缀

module.exports = {
  plugins: [
    autoprefixer()
  ]
}