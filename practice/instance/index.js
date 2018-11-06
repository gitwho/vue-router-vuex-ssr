import Vue from 'vue'

const div = document.createElement('div')
document.body.appendChild(div)

// 方法一
// new Vue({
//   el: '#root',
//   template: '<div>this is content</div>'
// })

// 方法2
const app = new Vue({
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  }
  // watch: { // 好处：组件销毁后，也自动销毁
  //   text (newText, oldText) {
  //     console.log(`${newText} : ${oldText}`)
  //   }
  // }
})

app.$mount('#root')

setInterval(() => {
  app.text += 1
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// app.$options.render = (h) => {     //重新定义render函数
//   return h('div', {}, 'new render function')
// }
// console.log(app.$root === app) //true,app.$root 就是 vue实例
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer) //是否有服务端渲染

// vue实例方法：
// $watch方法 和写在vue实例效果一样，但需主动销毁
// unwatch 返回的是注销方法
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)

// 事件监听$on, 只监听一次 $ons
// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })
// app.$emit('test', 1, 2)
