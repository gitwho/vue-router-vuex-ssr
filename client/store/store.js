import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    strict: isDev, // 是否启严格模式
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true, // a模块的命名空间在a模块下；默认在全局下
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) { // a模块里的state
            console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) { // state: a模块里的state; rootState: 全局的state
            return state.text + rootState.b.text
          }
        },
        actiions: {
          add ({ state, commit, rootState }) {
            commit('updateText', rootState.count, {root: true}) // commit本地mutations; 全局: 加第三参数
          }
        }
      },
      b: {
        state: {
          text: 2
        }
      }
    }
  })
}
