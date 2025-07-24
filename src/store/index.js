import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'
// 自动保存 vuex 中的数据到 localStorage，并且在下次开始的时候自动读取这个数据到对应的 state 中
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins: [
    createPersistedState({
      // 保存到 localStorage 中的 key
      key: 'universal-front',
      // 需要保存的模块
      paths: ['category', 'theme', 'search', 'user']
    })
  ]
})

export default store
