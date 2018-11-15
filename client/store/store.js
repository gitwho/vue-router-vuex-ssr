import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 是否启严格模式
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [ // 插件
      (store) => { // 初始化接受store参数
        // 写插件
        console.log('my plugin invoked')
      }
    ]
    // ,

    // modules: {
    //   a: {
    //     namespaced: true, // true: a模块的命名空间在a模块下； 默认在全局下
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) { // a模块里的state
    //         console.log('a.state', state)
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) { // state: a模块里的state; rootState: 全局的state
    //         return state.text + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({ state, commit, rootState }) {
    //         // commit('updateText', rootState.count) // commit本地找mutations; 若全局: 加第三参数{root: true}
    //         commit('updateCount', { num: 56789 }, { root: true }) // commit本地找mutations; 若全局: 加第三参数{root: true}
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       testAction ({ commit }) {
    //         commit('a/updateText', 'test text', { root: true })
    //       }
    //     }
    //   }
    // }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
