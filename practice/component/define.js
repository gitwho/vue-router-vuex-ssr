import Vue from 'vue'

// data要用function定义的原因：当有两个相同的组件时，会共用当前data值，
// 用函数定义return，会新建一个对象，让两个组件数据独立
const compo= {
  template: `
    <div>
      <input type="text" v-model="text" />
    </div>
  `,
  data () {
    return {
      text: 123
    }
  }

}

// Vue.component('CompOne', compo)

new Vue({
  components: {
    CompOne: compo
  },
  el: '#root',
  template: `
    <div>
      <comp-one></comp-one>
      <comp-one></comp-one>
    </div>
  `
})
