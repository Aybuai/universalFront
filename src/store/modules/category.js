import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'

export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    // navigationBar 展示的数据源
    categories: [ALL_CATEGORY_ITEM]
  }),
  mutations: {
    /**
     * 为 categories 赋值
     */
    setCategories(state, newCategories) {
      state.categories = [ALL_CATEGORY_ITEM, ...newCategories]
    }
  },
  actions: {
    /**
     * 获取 category 数据，并自动保存到 vuex 中
     */
    async useCategoriesData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategories', categorys)
    }
  }
}
