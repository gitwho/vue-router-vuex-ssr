// extend 用法
// $parent
import Vue from 'vue'

const compo = {
  props: {
    active: Boolean,
    propOne: String,
    onChange: Function
  },
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
    console.log('compo mounted')
  },
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const parent = new Vue({
  name: 'parent'
})

const compo2 = {
  // parent: parent, //无效，只能在new Vue的时候才能指定parent
  extends: compo, // 继承
  data () {
    return {
      text: 9
    }
  },
  mounted () {
    // console.log('compo2 mounted')
    console.log(this.$parent.$options.name) // 指向的是new Vue时，template 调用当前组件的父组件

    this.$parent.text = 8765 // （禁止使用） 子组件可以通过this.$parent调用父组件的值，
  }
}

// const CompVue = Vue.extend(compo)

// new CompVue({
//   el: '#root',
//   propsData: { // 通过props，compo 拿不到值
//     propOne: 'xxx'
//   },
//   data: { // 可以和compo data 数据合并
//     text: 0
//   },
//   mounted () {
//     console.log('instance mounted')
//   }

// })

new Vue({
  parent: parent, // 只能在new Vue的时候才能指定parent
  name: 'Root',
  el: '#root',
  components: {
    Comp: compo2
  },
  mounted () {
    console.log(this.$parent.$options.name)
  },
  data: {
    text: 456
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>

  `
})
