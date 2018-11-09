
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
      },
      [
        this.$slots.default,
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
        on: {

        }
      },
      [
        createElement(
          'span',
          {
            ref: 'span'
          },
          this.value
        )
      ]
    )
  }
})
