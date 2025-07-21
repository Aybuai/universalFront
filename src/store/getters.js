export default {
  categories: (state) => state.category.categories,
  /**
   * 当前主题
   */
  themeType: (state) => state.theme.themeType,
  /**
   * category 选中项
   */
  currentCategory: (state) => state.app.currentCategory,
  /**
   * category 选中项下标
   */
  currentCategoryIndex: (state, getters) => {
    return getters.categories.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
  },
  histories: (state) => state.search.histories
}
