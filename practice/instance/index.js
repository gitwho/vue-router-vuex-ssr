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
  template: '<div>{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: { // 好处：组件销毁后，也自动销毁
  //   text (newText, oldText) {
  //     console.log(`${newText} : ${oldText}`)
  //   }
  // }
})
app.$mount('#root')

// setInterval(() => {  //页面text值会变
//   app.text += 1
// }, 1000)

let i = 0
setInterval(() => { // 页面 {{obj.a}} 无变化：data里申明的某个对象（obj）上的值（a）没有进行申明，则给这个属性（a）赋值时就是非响应式的，不会引起vue重新渲染，值一直在变，但不能渲染到页面上，html上无变化
  // app.text += 1
  i++
  // app.obj.a = i  // 方法一
  // app.$forceUpdate() // 方法一: $forceUpdate -> 解决方法 (会影响性能)
  // 方法二
  app.$set(app.obj, 'a', i) // 对应的删除： app.$delete()
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// app.$options.render = (h) => {     //重新定义render函数
//   return h('div', {}, 'new render function')
// }
// console.log(app.$root === app) //true,app.$root 就是 vue对象
// console.log(app.$children) //
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer) //是否有服务端渲染

// vue实例方法：
// 1: $watch方法 和写在vue实例效果一样，但需主动销毁
// unwatch 返回的是注销方法
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)

// 2: 事件监听$on, 只触发一次：$once
// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })
// app.$emit('test', 1, 2)

// 3：app.$forceUpdate() 强制组件重新渲染

// $nextTick(callback) : 在vue进行下次dom更新时候，调用callback
