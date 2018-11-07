import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{firstName + ' ' + lastName}}</p>
      <p>Name: {{myName}}</p>
      <p>Name: {{getName()}}</p>
      <p>fullName: {{fullName}}</p>
      <p>number: {{number}}</p>
      <p><input type='text' v-model='number'/></p>
      <p>firstName: <input type='text' v-model='firstName'/></p>
      <p>lastName: <input type='text' v-model='lastName'/></p>
      <p>myName: <input type='text' v-model='myName'/></p>
      <p>obj.a: <input type='text' v-model='obj.a'/></p>
    </div>
  `,
  data: {
    firstName: 'Jok',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },

  // 改变number，应用会重新渲染到dom里面，
  // getName()方法会重新调用，但是computed里的getName不会

  computed: { // 有缓存: 常用于 简单处理数据
    // 写法一
    // myName () {
    //   console.log('new name')
    //   return `${this.firstName} ${this.lastName}`
    // }

    // 写法二: 不推荐用set
    myName: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: { // 主要场景： 监听数据变化，做某些操作
    // 注意：不要更改，监听的数据的值，会造成死循环
    // 初始不会执行
    // firstName (newName, oldName) {
    //   this.fullName = newName + ' ' + this.lastName
    // }
    // 想要执行：
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + ' ' + this.lastName
      },
      immediate: true,
      deep: true
    },
    //
    // obj: {
    //   handler () {
    //     console.log('obj.a changed')
    //   },
    //   immediate: true,
    //   // deep: false -> obj对象内属性的值改变（即 obj.a 值改变）不会触发；
    //   // 仅 给 obj 赋值 才会触发
    //   deep: true // 深入观察，obj对象内属性的值改变也会触发，开销大
    // }
    // deep: true 开销大的 解决方法
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true
    }
  },
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
