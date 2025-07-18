import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
// 自动持久化 vuex 中的数据；并且自动更新
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category
  },
  plugins: [
    createPersistedState({
      // 保存到 localStorage 中的 key
      key: 'categories',
      // 需要保存的模块
      paths: ['category']
    })
  ]
})

export default store
