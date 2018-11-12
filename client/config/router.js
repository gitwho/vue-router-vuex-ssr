import Router from 'vue-router'

import routes from './routes'

// const router = new Router({
//   routes
// })
// export default router  //无法创建新的router，服务端渲染会导致内存溢出，
//

export default () => {
  return new Router({
    routes,
    mode: 'history', // history去掉了‘#’
    // base: '/base/', //基础路径
    linkActiveClass: 'active-link', // 更改class值
    linkExactActiveClass: 'exact-active-link', // 更改class值
    scrollBehavior (to, from, savedPosition) { // 解决： 页面路径进行跳转时，页面要不要滚动的问题
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    fallback: true // history不是所有浏览器支持，当不支持时，自动转hasn路由
    // parseQuery (query) { // query:字符串， 路径里的参数，自定义方法去转

    // },
    // stringifyQuery (obj) { // obj转字符串

    // }
  })
}
