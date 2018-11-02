const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
  return {
    preservewhitepace: true, // 消除文档出现的空格
    extractCSS: !isDev, // 将css打包到一个文件里
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // 编译生成css名
      camelCase: true
    }
    // hotReload: false  //根据环境变量生成

    // loaders: {  // 自定义vue-loader模块解析
    //   'docs': docsLoader
    // },
  }
}
