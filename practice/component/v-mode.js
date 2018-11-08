
import Vue from 'vue'

const compo = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  template: `
    <div>
      <input type="text"
       @input="handleInput"
       :value="value1"
      />
    </div>
  `,
  // mounted () {
  //   console.log('compo mounted')
  // },
  // data () {
  //   return {
  //     text: 123
  //   }
  // },
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: compo
  },
  mounted () {

  },
  data: {
    value: 456
  },
  // <comp-one
  //   :value="value"
  //   @input="value = arguments[0] "
  // ></comp-one>
  template: `
    <div>
      <comp-one
        v-model="value"
      ></comp-one>
    </div>
  `
})
