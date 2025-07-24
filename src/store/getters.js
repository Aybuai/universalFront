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
  // 搜索历史
  histories: (state) => state.search.histories,
  // 搜索文本
  searchText: (state) => state.app.searchText,
  // 登录 token
  token: (state) => state.user.token,
  /**
   * 获取用户信息
   */
  userInfo: (state) => state.user.userInfo
}
