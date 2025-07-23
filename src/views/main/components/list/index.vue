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
        <item-vue :data="item" :width="width" @click="onToPins"></item-vue>
      </template>
    </m-waterfall>
  </m-infinite>

  <!-- 大图详情处理 -->
  <transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <pins-vue v-if="isVisiblePins" :id="currentPins.id" />
  </transition>
</template>

<script setup>
import { getPexelsList } from '@/api/pexel'
import { ref, watch } from 'vue'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'
import pinsVue from '../../../pins/components/pins.vue'

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

// 控制 pins 展示
const isVisiblePins = ref(false)
// 当前选中的 pins 属性
const currentPins = ref({})
/**
 * 进入 pins
 */
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  currentPins.value = item
  isVisiblePins.value = true
}

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.location?.translateX,
    y: currentPins.value.location?.translateY,
    opacity: 0
  })
}

/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})
</script>
<style scoped lang="scss"></style>
