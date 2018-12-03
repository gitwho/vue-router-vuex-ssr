<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="filter" @change="handleChangeTab">
        <tab :label="tab" :index="tab" v-for="tab in states1" :key="tab"></tab>
        <!-- <tab label="tab1" index="1">
          <span>tab 1 {{inputContent}}</span>
        </tab>
        <tab index="2">
          <span slot="label" style="color:red;">tab2</span>
          <span>tab 2</span>
        </tab>
        <tab label="tab3" index="3" >
          <span>tab 3</span>
        </tab> -->
      </tabs>
    </div>


    <input type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要做什么"
      @keyup.enter="handleAdd"
     >
    <item :todo="todo"
             v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
      @toggle="toggleTodoState"
    ></item>
    <Helper :filter="filter"
      :todos="todos"
      @clearAll="clearAllCompleted"
    ></Helper>

    <router-view />
  </section>
</template>

<script>
import Item from './item.vue'
import Helper from './helper.vue'

import {mapState, mapActions} from 'vuex'

// let id = 0

export default {
  metaInfo: {
    title: 'my TODO page'
  },
  // 组件导航钩子
  beforeRouteEnter (to, from, next) { // 获取数据
    console.log('todo before enter')
    next(vm => {
      console.log('after enter vm.id is', vm.id)
    })
  },
  beforeRouteUpdate (to, from, next) { // 路由切换用到相同组件，获取不同数据，数据出错可以进行错误提醒，不进入下个页面
    console.log('todo update enter')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo leave enter')
    // if (global.confirm('are you sure?')) {
    //   next()
    // }
  },

  props: ['id'],
  mounted () { // 当切换的页面用的是相同的组件，则不会触发，要用beforeRouteEnter获取数据
    // console.log(this.id)
    // console.log('todo mounted')
    this.fetchTodos()
  },
  data () {
    return {
      // todo: {
      //   id: 0,
      //   content: 'this is todo',
      //   completed: false
      // },
      // todos: [],
      filter: 'all',
      // inputContent: '',
      states1: ['all', 'active', 'completed']
    }
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  components: {
    Item,
    Helper
  },
  methods: {
    ...mapActions(['fetchTodos', 'addTodo', 'deleteTodo', 'updateTodo', 'deleteAllCompleted']),
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入要做的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // deleteTodo (id) {
    //   this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    // },
    clearAllCompleted () {
      // this.todos = this.todos.filter(todo => !todo.completed)
      this.deleteAllCompleted()
    },
    handleChangeTab (value) {
      this.filter = value
    },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
.tab-container
  background-color #ffffff
  padding 0 15px
</style>
