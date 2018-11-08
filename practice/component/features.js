
import Vue from 'vue'

const compo = {
  template: `
    <div>
      <input type="text"

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

  template: `
    <div>
      <comp-one
        v-model="value"
      ></comp-one>
    </div>
  `
})
