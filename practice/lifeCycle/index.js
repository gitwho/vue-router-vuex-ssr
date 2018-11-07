// 1.vue生命周期方法
// 2.生命周期方法的调用顺序：
//  beforeCreate，created，beforeMount，mounted 只调用一次；
// 且在服务端渲染时，beforeMount，mounted  不执行（它们与dom操作有关，服务端渲染无dom执行环境）
// 3.生命周期中VUE实例有哪些区别
// 不同环节 this.$el 有不同内容， 在mounted之后一般不能更改$el节点，防止错误

import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 'aaa'
  },
  // beforeCreate，created: 无法拿到组件对应的dom节点
  beforeCreate () {
    console.log(this.$el, 'beforeCreate') // undefined
  },
  created () { // 可放 跟 数据有关的 操作
    console.log(this.$el, 'created')// undefined
  },
  // beforeMount,mounted：当el有值时，才会执行，将vue组件生成的内容挂载到dom节点上
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  },
  mounted () { // 可放 跟dom有关的， 数据有关的
    console.log(this.$el, 'mounted')
  },
  // beforeUpdate,updated数据更新才执行
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  // activated,deactivated 与 keep-alive有关
  activated () { // 在组件章节讲解
    console.log(this, 'activated')
  },
  deactivated () { // 在组件章节讲解
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  render (h) { // h:crreateElement方法
    throw new TypeError('render Error')
    // console.log('render function invoked')
    // return h('div', {}, this.text) // 标签， 对象：事件等等， 内容
  },
  renderError (h, err) { // 开发环境可用
    return h('div', {}, err.stack)
  },
  errorCaptured () { // 可用于线上环境
    // 会向上冒泡，并且正式环境可以使用
  }
})

app.$mount('#root')
// setInterval(() => { //验证update
//   app.text = app.text += 1
// }, 1000)

setTimeout(() => { // 验证destory
  app.$destroy()
}, 1000)
