import Vue from 'vue'

// const a = {  //错误示例：return 全局变量，
//   text: 322
// }

const compo = {
  // props: ['active', propOne] //直接传变量名
  props: {
    active: {
      // type: Boolean,
      required: true, // 一定要传
      // default: false  //默认值，
      // 若active是个对象，default写法： default() {return { xxx } }
      validator (value) { // 判断传入的值是否符合要求
        return typeof value === 'boolean'
      }
    },
    propOne: String,
    onChange: Function
  },
  // props: {
  //   active: Boolean,
  //   propOne: String,
  //   onChange: Function
  // },
  template: `
    <div>
      <input type="text" v-model="text" />
      <div>
        <span v-show="active">see me</span>
        <span @click="handleChange">{{propOne}}</span>
      </div>
    </div>
  `,
  mounted () {
    // this.propOne = 'inner content' // 不能这样改props的值
  },
  // data要用function定义的原因：当有两个相同的组件时，会共用当前data值，
  // 用函数定义return，会新建一个对象，让两个组件数据独立
  data () {
    return {
      text: 123
    }
    // 错误示例：return 全局变量，
    // eg: return  a; a={text: 332}(组件外定义的全局变量)
    // return a
  },
  methods: {
    handleChange () {
      // this.onChange() // 法一：与 :on-change对应
      this.$emit('change') // 法二：与 @change对应
    }
  }
}

// Vue.component('CompOne', compo) //全局组件

new Vue({
  components: { // 组件只在某个地方使用
    CompOne: compo
  },
  data: {
    prop1: 'text1'
  },
  el: '#root',
  template: `
    <div>
      <comp-one :active="true"
        :prop-one="prop1"
        @change="handleChange"
        :on-change="handleChange"
      ></comp-one>
      <comp-one :active="false"></comp-one>
    </div>
  `,
  // <comp-one active="true"></comp-one>
  // active="true" :传入的是字符串；:active="true",v-bing会处理成boolean

  methods: {
    handleChange () {
      this.prop1 += 1
    }
  }
})
