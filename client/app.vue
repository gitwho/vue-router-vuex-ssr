<template>
  <div id='app'>
    <div id="cover"></div>
    <Header></Header>
    <p>{{fullName}} {{counter}}</p>
    <!-- <p>{{textA}} {{textPlus}}</p> -->
    <!-- <p>{{textC}}</p> -->
    <!-- <router-link to='/app'>app</router-link> -->
    <!-- <router-link :to="{name: 'app'}">app</router-link> -->
    <!-- <router-link to="/app/123">app123</router-link>
    <router-link to="/app/456">app456</router-link>
    <router-link to='/login'>login</router-link> -->
    <!-- <router-link to='/login/exact'>login exact</router-link> -->
    <!-- <todo></todo> -->

    <!-- <tabs>
      <tab label="text">
        <span slot="label"></span>
        <p>this is tab content</p>
      </tab>
    </tabs>
    <ul>
      <li>label</li>
      <li>label2</li>
    </ul>
    <div class="tab-container">
      <p>This is tab content</p>
    </div> -->


    <transition name="fade">
      <router-view />
    </transition>

    <button @click="notify">click me</button>
    <!-- <notification content="test notify" /> -->
    <Footer></Footer>

    <!-- <router-view name="a"/> -->
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  // import Todo from './views/todo/todo.vue'

  // console.log(Header.__docs)

  export default {
    metaInfo: {
      title: 'my todo app'
    },
    components: {
      Header,
      Footer
      // Todo
    },
    mounted () {
      // console.log(this.$route)
      console.log(this.$store)

      // this.$store.dispatch('updateCountAsync', { // dispatch用来触发action
      //   num: 5,
      //   time: 2000
      // })
      this.updateCountAsync({
        num: 5,
        time: 2000
      })

      // let i = 1
      // setInterval(() => { // $store.commit:调用mutation方法 updateCount
      //   this.$store.commit('updateCount', { // commit 方法只接受两个参数
      //     num: i++,
      //     num2: 2
      //   })
      // }, 1000)
      // //
      // let i = 1
      // setInterval(() => { // $store.commit:调用mutation方法 updateCount
      //   this.updateCount({ // commit 方法只接受两个参数
      //     num: i++,
      //     num2: 2
      //   })
      // }, 1000)

      // this.updateText('123') // nameSpace: false 的情况
      // this['a/updateText']('123') // nameSpace: true 的情况
      // this['a/add']()
      // this.testAction()
    },
    methods: {
      // ...mapActions(['updateCountAsync', 'a/add', 'testAction']),
      ...mapActions(['updateCountAsync']),
      // ...mapMutations(['updateCount', 'a/updateText'])
      ...mapMutations(['updateCount']),
      //
      notify () {
        this.$notify({
          content: 'test $notify',
          btn: 'close'
        })
      }
    },
    computed: {
      // textA () {
      //   return this.$store.state.a.text
      // },

      // ...mapState(['count'])  // 同名
      // ...mapState({ // 不同命
      //   counter: 'count'
      // }),
      ...mapState({ // 不同命
        counter: (state) => state.count
        // textA: (state) => state.a.text,
        // textC: state => state.c.text
      }),
      // count () {
      //   return this.$store.state.count
      // },
      ...mapGetters({
        'fullName': 'fullName'
        // textPlus: 'a/textPlus'
      })
      // fullName () {
      //   return this.$store.getters.fullName
      // }
    }
  }
</script>

<style lang="stylus" scoped>
  #app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
  #cover{
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
  }
</style>
