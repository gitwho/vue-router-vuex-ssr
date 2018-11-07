import Vue from 'vue'

var globalVar = '121' // eslint-disable-line

new Vue({
  el: '#root',
  // template 可以访问绑定在vue上的所有值，及默认的js的全局对象
  // 但 自己定义的全局变量不能访问，eg： globalVar
  // 1.
  // template: `
  //   <div>
  //     {{isActive ? 'active' : 'not active'}}
  //     {{arr.join(' ')}}
  //     {{Date.now()}}
  //   </div>
  // `,

  // 2.
  // template: `{{globalVar}}`, // 无法访问

  // 3.
  // template: `
  //   <div v-bind:id='aaa' v-on:click="handleClick">
  //     <p v-html='html'></p>
  //   </div>
  // `,

  // 4.
  template: `
    <div :class="{ active : !isActive }"
      :style="[styles, styles2]"
    >
      <div :class="[isActive ? 'active' : '']"></div>
      <div :class="[{ active : isActive}]"></div>
      <p v-html='html'></p>
    </div>
  `,

  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>hello</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none'
    },
    styles2: {
      backgroundColor: '#459'
    }
  },
  computed: {
    classNames () {
      // 返回一个class，也可以实现动态class
    }
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  }
})
