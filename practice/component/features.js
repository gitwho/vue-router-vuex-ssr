
import Vue from 'vue'

const ChildComponent = {
  template: `
    <div>child component</div>
  `,
  inject: ['yeye', 'value'],
  mounted () {
    // 只能找到上一级： com
    console.log(this.$parent.$options.name)

    console.log(this.yeye, this.value)
  }
}

const compo = {
  name: 'com',
  components: {
    ChildComponent
  },
  // <div :style="styles">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  template: `
    <div :style="styles">
      <slot :value="value" aaa="222"></slot>
      <child-component></child-component>
    </div>
  `,
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
  provide () {
    return {
      yeye: this,
      value: this.value
    }
  },
  data: {
    value: 456
  },
  mounted () {
    // ref 用在组件与标签上的区别：vuecomponent 与 html节点
    console.log(this.$refs.comp, this.$refs.span)
  },
  //   <div>
  //   <comp-one>
  //     <span slot="header">this is header</span>
  //     <span slot="body">this is body</span>
  //   </comp-one>
  // </div>

  // {{value}}：当前vue组件的value
  // 想访问comp-one 里的value值 : slot-scope(作用域插槽)
  template: `
    <div>
      <comp-one ref="comp">
        <span ref="span"
         slot-scope="props"
        >
          {{props.value}} : {{props.aaa}} : {{value}}
        </span>
      </comp-one>
 
    </div>
  `
})
