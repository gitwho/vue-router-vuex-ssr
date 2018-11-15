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

// 增加模块
store.registerModule('c', {
  state: {
    text: 3
  }
})

// 解绑module
// store.unregisterModule('c') // module名

// 参数：两个方法；第一个方法返回值有变化时，调用第二个方法（为回调函数）
// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('new count watched: ', newCount)
// })

// // vue用于插件
// // 订阅: 能够监听到mutation被调用
// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })
// // 订阅: 能够监听到action被调用
// store.subscribeAction((action, state) => {
//   console.log(action.type)
//   console.log(action.payload)
// })

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
