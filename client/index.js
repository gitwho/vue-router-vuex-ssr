// 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import createStore from './store/store'

// import './assets/styles/test.css'
// import './assets/styles/test-stylus.styl'
// import './assets/images/bg.jpeg'

import './assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = createRouter()
const store = createStore()

// // 全局导航钩子
// router.beforeEach((to, from, next) => {
//   console.log('before each invoked')
//   next() // 路由跳转
//   // if (to.fullPath === '/login') { // 应用：验证用户是否登录
//   //   next({path: '/app'})
//   // }
// })
// router.beforeResolve((to, from, next) => {
//   console.log('before resolve invoked')
//   next()
// })
// // 跳转完成
// router.afterEach((to, from) => {
//   console.log('after each invoked')
// })

// const root = document.createElement('div')
// document.body.appendChild(root)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
