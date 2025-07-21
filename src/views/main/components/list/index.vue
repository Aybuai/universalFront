<template>
  <m-infinite
    v-model="loading"
    :isFinished="isFinished"
    @onLoad="getPexelsData"
  >
    <m-waterfall
      :data="pexelsList"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
      class="w-full px-1"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width"></item-vue>
      </template>
    </m-waterfall>
  </m-infinite>
</template>

<script setup>
import { getPexelsList } from '@/api/pexel'
import { ref, watch } from 'vue'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'

const store = useStore()
/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20
}
// 数据是否在加载中
const loading = ref(false)
// 数据是否全部加载完成
const isFinished = ref(false)
// 数据源
const pexelsList = ref([])
/**
 * 加载数据的方法
 */
const getPexelsData = async () => {
  // 数据全部加载完成，不再请求
  if (isFinished.value) return

  // 完成第一次请求之后，后续再请求让 page 自增 1
  if (pexelsList.value.length && pexelsList.value.length > 0) {
    query.page += 1
  }

  // 触发接口请求
  const { list, total } = await getPexelsList(query)

  if (query.page === 1) {
    pexelsList.value = list
  } else {
    pexelsList.value.push(...list)
  }

  // 判断数据是否全部加载完成
  if (pexelsList.value.length === total) {
    isFinished.value = true
  }

  // 修改 loading 标记
  loading.value = false
}

/**
 * 通过此方法修改 query 请求参数，重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  // 重置状态
  isFinished.value = false
  pexelsList.value = []
}

/**
 * 监听 currentCategory 的变化
 */
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)

/**
 * 监听搜索内容项的变化
 */
watch(
  () => store.getters.searchText,
  (val) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)
</script>
<style scoped lang="scss"></style>
