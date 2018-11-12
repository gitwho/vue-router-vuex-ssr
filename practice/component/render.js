
import Vue from 'vue'

const compo = {
  name: 'com',
  props: ['props1'],

  // template: `
  //   <div :style="styles">
  //     <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement(
      'div',
      {
        style: this.styles
        // ,
        // on: {
        //   click: () => { this.$emit('click') }
        // }

      },
      [
        // this.$slots.default, // slot 有name，则this.$slots.name
        this.$slots.header,
        this.props1
      ]
    )
  },
  data () {
    return {
      styles: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  },
  methods: {

  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: compo
  },

  data: {
    value: 456
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.span)
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  },
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span ref="span">{{value}}</span>
  //     </comp-one>
  //   </div>
  // `,

  // template 会通过下面这种形式处理
  render (createElement) { // createElement：创建虚拟dom结构，放在内存中与真正dom结构对比
    // 节点名， 节点属性， 组件里面的内容
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          props1: this.value
        },
        // on: {
        //   click: this.handleClick
        // },
        nativeOn: { // 自动绑定到根节点原生dom上，不需要组件再绑定click及手动触发emit
          click: this.handleClick
        }
      },
      [
        createElement(
          'span',
          {
            ref: 'span',
            slot: 'header',
            domProps: {
              innerHTML: '<span>99</span>'
            },
            attrs: {
              id: 'testId'
            }
          },
          this.value
        )
      ]
    )
  }
})
